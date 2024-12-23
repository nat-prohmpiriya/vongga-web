import axios from "axios";
import toCamelCase from "../utils/toCamelCase";

class AuthService {
    async verifyTokenFirebase (accessToken: string) {
        try {
            const url = process.env.NEXT_PUBLIC_VONGGA_API_URL + '/auth/verifyTokenFirebase';
            const { data } = await axios.post(url, { "firebaseToken": accessToken });      
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data
        } catch (error: any) {
            console.error('Error verifying Firebase token:', error);
            return null;
        }
    }

    async refreshToken(refreshToken: string) {
        try {
            const url = process.env.NEXT_PUBLIC_VONGGA_API_URL + '/auth/refresh';
            const { data } = await axios.post(url, { "refreshToken": refreshToken });
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            return data;
        } catch (error: any) {
            console.error('Error refreshing token:', error);
            return null;
        }
    }
}

export default new AuthService();