import vonggaAxios from "@/utils/vonggaAxios"

export interface CreateStory {
    mediaUrl: string
    mediaType: 'image' | 'video'
    mediaDuration: number
    thumbnail: string
    caption: string
    location: string
}

export interface StoryResponse {
    id: string
    createdAt: string
    updatedAt: string
    version: number
    userId: string
    media: Media
    caption: string
    location: string
    viewersCount: number
    viewers: Viewer[]
    expiresAt: string
    isArchive: boolean
    isActive: boolean
    user: User
}

interface Media {
    url: string
    type: string
    duration: number
    thumbnail: string
}

interface Viewer {
    isArchive: boolean
    userId: string
    viewdAt: string

}

interface User {
    id: string
    username: string
    displayName: string
    photoProfile: string
    firstName: string
    lastName: string
}

class StoryService {
    async createStory(story: CreateStory) {
        try {
            const response = await vonggaAxios.post("/stories", story)
            console.timeLog('createStory', response)
            return response?.data
        } catch (error: any) {
            console.error('createStory error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }
    async getAtiveStories() {
        try {
            const response = await vonggaAxios.get("/stories/active")
            return response?.data?.stories
        } catch (error: any) {
            console.error('getAtiveStories error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getUserStories(userId: string) {
        try {
            const response = await vonggaAxios.get(`/stories/user/${userId}`)
            return response.data
        } catch (error: any) {
            console.error('getUserStories error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async getStoryById(id: string) {
        try {
            const response = await vonggaAxios.get(`/stories/${id}`)
            return response.data.story
        } catch (error: any) {
            console.error('getStoryById error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }
    async viewStory(id: string) {
        try {
            const response = await vonggaAxios.post(`/stories/${id}/view`)
            return response.data
        } catch (error: any) {
            console.error('viewStory error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }

    async deleteStory(id: string) {
        try {
            const response = await vonggaAxios.delete(`/stories/${id}`)
            return response.data
        } catch (error: any) {
            console.error('deleteStory error', {
                message: error?.response?.data?.message || error.message,
                status: error?.response?.status
            })
            return null
        }
    }
}

export const mockStories: CreateStory[] = [
    {
        mediaUrl: "https://picsum.photos/800/800?random=1",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=1",
        caption: "ชมพระอาทิตย์ตกที่ภูเขา 🌄 #sunset #mountain",
        location: "ดอยสุเทพ, เชียงใหม่"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=2",
        mediaType: "video",
        mediaDuration: 30,
        thumbnail: "https://picsum.photos/200/200?random=2",
        caption: "เบื้องหลังการถ่ายแบบ 📸 #photoshoot #model",
        location: "EmQuartier, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=3",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=3",
        caption: "ดอกไม้บานสะพรั่ง 🌸 #flowers #spring",
        location: "สวนดอกไม้เชียงราย, เชียงราย"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=4",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=4",
        caption: "วันพักผ่อนที่ทะเล 🏖️ #beachday #relax",
        location: "หาดป่าตอง, ภูเก็ต"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=5",
        mediaType: "video",
        mediaDuration: 45,
        thumbnail: "https://picsum.photos/200/200?random=5",
        caption: "คอนเสิร์ตสุดมันส์ 🎸 #concert #music",
        location: "Impact Arena, นนทบุรี"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=6",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=6",
        caption: "ขนมไทยโบราณ 🍪 #thaidessert #traditional",
        location: "ตลาดน้ำอัมพวา, สมุทรสงคราม"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=7",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=7",
        caption: "สตรีทอาร์ต สุดเจ๋ง 🎨 #streetart #urban",
        location: "ย่านเจริญกรุง, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=8",
        mediaType: "video",
        mediaDuration: 20,
        thumbnail: "https://picsum.photos/200/200?random=8",
        caption: "เต้นคัฟเวอร์เพลงใหม่ 💃 #dance #cover",
        location: "MBK Center, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=9",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=9",
        caption: "ชาบูมื้อพิเศษ 🍲 #shabu #dinner",
        location: "Central World, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=10",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=10",
        caption: "เที่ยวถ้ำผจญภัย 🏔️ #cave #adventure",
        location: "ถ้ำนาคา, บึงกาฬ"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=11",
        mediaType: "video",
        mediaDuration: 25,
        thumbnail: "https://picsum.photos/200/200?random=11",
        caption: "ทำอาหารกับเพื่อน 👨‍🍳 #cooking #friends",
        location: "บ้านเพื่อน, นครราชสีมา"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=12",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=12",
        caption: "ปั่นจักรยานยามเช้า 🚲 #cycling #morning",
        location: "สวนรถไฟ, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=13",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=13",
        caption: "งานแต่งเพื่อนสนิท 👰 #wedding #celebration",
        location: "Centara Grand, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=14",
        mediaType: "video",
        mediaDuration: 35,
        thumbnail: "https://picsum.photos/200/200?random=14",
        caption: "เล่นน้ำตก สดชื่น 💦 #waterfall #nature",
        location: "น้ำตกเอราวัณ, กาญจนบุรี"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=15",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=15",
        caption: "ช้อปปิ้งของขวัญปีใหม่ 🎁 #shopping #newyear",
        location: "สยามพารากอน, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=16",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=16",
        caption: "ดูหนังกับแก๊งค์ 🎬 #movie #friends",
        location: "Icon Siam, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=17",
        mediaType: "video",
        mediaDuration: 40,
        thumbnail: "https://picsum.photos/200/200?random=17",
        caption: "เล่นดนตรีในสวน 🎸 #music #garden",
        location: "สวนลุมพินี, กรุงเทพมหานคร"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=18",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=18",
        caption: "ตลาดนัดกลางคืน 🏮 #nightmarket #food",
        location: "ตลาดรถไฟ, ศรีนครินทร์"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=19",
        mediaType: "image",
        mediaDuration: 0,
        thumbnail: "https://picsum.photos/200/200?random=19",
        caption: "เวิร์คช็อปทำเครื่องปั้นดินเผา 🏺 #pottery #workshop",
        location: "เกาะเกร็ด, นนทบุรี"
    },
    {
        mediaUrl: "https://picsum.photos/800/800?random=20",
        mediaType: "video",
        mediaDuration: 28,
        thumbnail: "https://picsum.photos/200/200?random=20",
        caption: "ปาร์ตี้วันเกิด 🎂 #birthday #party",
        location: "Above Eleven, กรุงเทพมหานคร"
    }
];


export default new StoryService()

