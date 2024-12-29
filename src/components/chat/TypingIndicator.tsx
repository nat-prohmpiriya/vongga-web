import { useChat } from '@/providers/ChatProvider'
import { useEffect, useState } from 'react'

interface TypingIndicatorProps {
    roomId: string
}

export const TypingIndicator = ({ roomId }: TypingIndicatorProps) => {
    const { typingUsers } = useChat()
    const [typingNames, setTypingNames] = useState<string[]>([])

    useEffect(() => {
        const users = typingUsers[roomId]
        if (users) {
            setTypingNames(Array.from(users))
        } else {
            setTypingNames([])
        }
    }, [typingUsers, roomId])

    if (typingNames.length === 0) return null

    return (
        <div className='px-4 py-2'>
            <div className='text-sm text-gray-500 italic'>
                {typingNames.length === 1 ? (
                    <span>{typingNames[0]} กำลังพิมพ์...</span>
                ) : (
                    <span>มีหลายคนกำลังพิมพ์...</span>
                )}
            </div>
        </div>
    )
}
