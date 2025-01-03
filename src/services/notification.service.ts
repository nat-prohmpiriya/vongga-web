
import vonggaAxios from "@/utils/vonggaAxios"

export interface notificationResponseItem {
    id: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    version: number;
    recipientId: string;
    senderId: string;
    type: string;
    refId: string;
    refType: string;
    message: string;
    isRead: boolean;
    sender: Sender;
}

export interface Sender {
    userId: string;
    username: string;
    displayName: string;
    photoProfile: string;
    firstName: string;
    lastName: string;
}


interface notificationResponse {
    notifications: notificationResponseItem[];
}

class NotifcationService {
    async getNotifications({ limit = 10, offset = 0 }: any) {
        try {
            const response = await vonggaAxios.get(`/notifications?limit=${limit}&offset=${offset}`)
            return response.data
        } catch (error) {
            console.error('getNotifications error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async markNotificationAsRead(id: string) {
        try {
            const response = await vonggaAxios.post(`/notifications/${id}/read`)
            return response.data
        } catch (error) {
            console.warn('markNotificationAsRead error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }


}

export default new NotifcationService()