
import vonggaAxios from "@/utils/vonggaAxios"

export interface notificationResponseItem {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    version: number;
    recipientId: string;
    senderId: string;
    type: string;
    refId: string;
    refType: string;
    message: string;
    isRead: boolean;
}

interface notificationResponse {
    notifications: notificationResponseItem[];
}

class NotifcationService {
    async getNotifications({ limit = 10, offset = 0 }: any) {
        try {
            const response = await vonggaAxios.get(`/notifications?limit=${limit}&offset=${offset}`)
            return response.data
        } catch (error: any) {
            console.error('getNotifications error', {
                message: error.response.data.message,
                status: error.response.status
            })
            return null
        }
    }
}

export default new NotifcationService()