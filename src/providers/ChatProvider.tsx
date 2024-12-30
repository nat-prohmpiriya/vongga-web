"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import clientToken from '@/utils/clientToken';
import { ChatMessage, WebSocketMessage } from '@/types/chat';
import { useAuthStore } from '@/store/auth.store';
import chatService from '@/services/chat.service';

interface ChatContextType {
    sendMessage: (roomId: string, content: string) => void;
    sendTyping: (roomId: string, isTyping: boolean) => void;
    fetchMessages: (roomId: string) => Promise<void>;
    messages: Record<string, ChatMessage[]>;
    typingUsers: Record<string, Set<string>>;
    isConnected: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore();
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
    const [typingUsers, setTypingUsers] = useState<Record<string, Set<string>>>({});

    const fetchMessages = async (roomId: string) => {
        try {
            console.log('Fetching messages for room:', roomId);
            const response = await chatService.getMessages(roomId);
            console.log('Messages response:', response);
            if (!response) return;

            setMessages(prev => ({
                ...prev,
                [roomId]: response
            }));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectCountRef = useRef(0);
    const maxReconnectAttempts = 5;

    const cleanupSocket = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
        if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
            reconnectTimeoutRef.current = null;
        }
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
            pingIntervalRef.current = null;
        }
        setIsConnected(false);
    }, []);

    const startPingInterval = useCallback(() => {
        if (pingIntervalRef.current) {
            clearInterval(pingIntervalRef.current);
        }
        pingIntervalRef.current = setInterval(() => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                const pingMessage: WebSocketMessage = {
                    type: 'ping',
                    roomId: '',
                    content: ''
                };
                socketRef.current.send(JSON.stringify(pingMessage));
            }
        }, 30000);
    }, []);

    const sendMessage = useCallback((roomId: string, content: string) => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN || !user?.id) {
            console.error('WebSocket is not connected or user is not logged in');
            return;
        }

        const message: WebSocketMessage = {
            type: 'message',
            roomId,
            content
        };
        socketRef.current.send(JSON.stringify(message));
    }, [user]);

    const sendTyping = useCallback((roomId: string, isTyping: boolean) => {
        if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN || !user?.id) {
            return;
        }

        const typingMessage: WebSocketMessage = {
            type: 'typing',
            roomId,
            content: isTyping ? 'true' : 'false'
        };
        socketRef.current.send(JSON.stringify(typingMessage));
    }, [user]);

    const connectWebSocket = useCallback(() => {
        if (!user) return;

        // Cleanup existing connection
        cleanupSocket();

        const token = clientToken.getToken().accessToken;
        if (!token) {
            console.error('No access token available');
            return;
        }

        try {
            const ws = new WebSocket(`${process.env.NEXT_PUBLIC_VONGGA_API_URL}/ws?token=${token}`);
            socketRef.current = ws;

            ws.onopen = () => {
                console.log('WebSocket Connected');
                setIsConnected(true);
                reconnectCountRef.current = 0;
                startPingInterval();
            };

            ws.onclose = (event) => {
                console.log('WebSocket Closed:', event.code, event.reason);
                cleanupSocket();

                // Attempt to reconnect if closure was abnormal
                if ((event.code === 1006 || event.code === 1011) &&
                    reconnectCountRef.current < maxReconnectAttempts) {
                    const delay = Math.min(1000 * Math.pow(2, reconnectCountRef.current), 30000);
                    reconnectCountRef.current++;

                    console.log(`Reconnecting in ${delay / 1000}s... (attempt ${reconnectCountRef.current}/${maxReconnectAttempts})`);
                    reconnectTimeoutRef.current = setTimeout(connectWebSocket, delay);
                }
            };

            ws.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };

            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data) as WebSocketMessage;

                    switch (message.type) {
                        case 'message':
                            setMessages(prev => {
                                const roomMessages = prev[message.roomId] || [];
                                const chatMessage: ChatMessage = {
                                    id: window.crypto.randomUUID(),
                                    roomId: message.roomId,
                                    senderId: message.senderId!,
                                    content: message.content,
                                    type: message.type,
                                    readBy: [],
                                    createdAt: message.createdAt || new Date().toISOString(),
                                    updatedAt: message.createdAt || new Date().toISOString()
                                };
                                return {
                                    ...prev,
                                    [message.roomId]: [...roomMessages, chatMessage]
                                };
                            });
                            break;

                        case 'typing':
                            const isTyping = message.content === 'true';
                            setTypingUsers(prev => {
                                const roomTyping = new Set(prev[message.roomId] || []);
                                if (isTyping) {
                                    roomTyping.add(message.roomId!);
                                } else {
                                    roomTyping.delete(message.roomId!);
                                }
                                return {
                                    ...prev,
                                    [message.roomId]: roomTyping
                                };
                            });
                            break;

                        case 'pong':
                            // Handle pong response if needed
                            break;
                    }
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            };
        } catch (error) {
            console.error('Error connecting to WebSocket:', error);
        }
    }, [user, cleanupSocket, startPingInterval]);

    useEffect(() => {
        connectWebSocket();
        return () => cleanupSocket();
    }, [connectWebSocket, cleanupSocket]);


    return (
        <ChatContext.Provider value={{
            sendMessage,
            sendTyping,
            fetchMessages,
            messages,
            typingUsers,
            isConnected
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}