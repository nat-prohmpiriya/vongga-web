import axios from "axios";


export default function handleAxiosError(namefunction: string, error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error(`${namefunction} Axios error:`, {
            message: error?.response?.data?.message || error.message,
            status: error?.response?.status
        })
    } else if (error instanceof Error) {
        console.error(`${namefunction} Error:`, error.message)
    } else {
        console.error(`${namefunction} Unknown error:`, error)
    }
}