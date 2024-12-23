import axios from "axios";

class AuthService {
    async verifyTokenFirebase (accessToken: string) {
        try {
            const url = process.env.NEXT_PUBLIC_VONGGA_API_URL + '/auth/verifyTokenFirebase';
            const {data } = await axios.post(url, { "firebaseToken": accessToken });         
            console.log({ data });
            return data;
        } catch (error: any) {
            console.error('Error verifying Firebase token:', error);
            return null;
        }
    }
}

export default new AuthService();