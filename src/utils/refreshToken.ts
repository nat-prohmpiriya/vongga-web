import axios from "axios";

export default async function refreshToken() {
    try {
        const url = process.env.NEXT_PUBLIC_VONGGA_API_URL + '/auth/refresh';
        const body = {
            refreshToken: localStorage.getItem('refreshToken'),
        };
        const response = await axios.post(url, body);
        return response.data.accessToken;
    } catch (error: any) {
        console.error('Error refreshing token:', {
            message: error?.response?.data?.message || error.message,
            status: error?.response?.status
        });
        return null;
    }
}
