# Refresh Token Implementation

## Overview
การทำ Refresh Token เป็นส่วนสำคัญในการรักษาความปลอดภัยและ user experience ของแอพพลิเคชัน โดยใช้ Axios Interceptor ในการจัดการ token อัตโนมัติ

## การทำงานของระบบ

### 1. Token Storage
```typescript
// clientToken.ts - สำหรับ Client-side
interface Token {
    accessToken: string
    refreshToken: string
}

// serverToken.ts - สำหรับ Server-side
interface Token {
    accessToken: string
    refreshToken: string
}
```

### 2. Axios Interceptor
ระบบใช้ Axios Interceptor 2 ตัว:
1. Request Interceptor: เพิ่ม Authorization header
2. Response Interceptor: จัดการ token หมดอายุและทำ refresh

### 3. การป้องกัน Race Condition
```typescript
let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []
```
- `isRefreshing`: ป้องกันการเรียก refresh token พร้อมกันหลายครั้ง
- `refreshSubscribers`: เก็บ requests ที่รอ token ใหม่

## ขั้นตอนการทำงาน

1. **เมื่อส่ง Request**
   - ตรวจสอบ Authorization header
   - ถ้าไม่มี header, เพิ่ม access token
   - จัดการ FormData แยก

2. **เมื่อได้รับ 401 Error**
   - ตรวจสอบว่าเป็น refresh token request หรือไม่
   - ถ้าใช่, reject error ทันที
   - ถ้าไม่ใช่, เริ่มกระบวนการ refresh token

3. **กระบวนการ Refresh Token**
   ```typescript
   if (isRefreshing) {
       // ถ้ากำลัง refresh อยู่, เก็บ request ไว้ใน queue
       return new Promise(resolve => {
           addRefreshSubscriber(token => {
               resolve(retryRequest(originalRequest, token))
           })
       })
   }
   ```

4. **การ Retry Requests**
   ```typescript
   const retryRequest = (request: InternalAxiosRequestConfig, accessToken: string) => {
       request.headers.Authorization = `Bearer ${accessToken}`
       return axios(request)
   }
   ```

## การจัดการ Error

1. **Token ไม่ถูกต้อง**
   ```typescript
   if (!token.accessToken) {
       throw new Error('No access token available')
   }
   ```

2. **Refresh Token หมดอายุ**
   ```typescript
   if (isClient()) {
       clientToken.clearToken()
       document.cookie = 'auth-storage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
       window.location.href = '/'
   }
   ```

## ความปลอดภัย

1. **การเก็บ Token**
   - ใช้ httpOnly cookie แทน localStorage
   - ลบข้อมูลทั้งหมดเมื่อ logout

2. **Timeout**
   ```typescript
   const response = await axios.post(
       '/auth/refresh',
       { refreshToken },
       { timeout: 10000 }
   )
   ```

3. **Headers**
   - ใช้ Bearer token authentication
   - จัดการ Content-Type อัตโนมัติสำหรับ FormData

## Best Practices

1. **Race Condition Prevention**
   - ใช้ flag เพื่อติดตามสถานะการ refresh
   - จัดการ queue ของ pending requests

2. **Error Handling**
   - แยกประเภทของ error
   - จัดการ network errors และ timeouts
   - ทำ logout อัตโนมัติเมื่อจำเป็น

3. **Code Organization**
   - แยกฟังก์ชันให้ทำงานเฉพาะอย่าง
   - ใช้ TypeScript interfaces
   - มี error messages ที่ชัดเจน

## การใช้งาน

```typescript
// สร้าง instance ของ axios
const vonggaAxios = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_VONGGA_API_URL,
    timeout: 30000,
})

// ใช้งาน
try {
    const response = await vonggaAxios.get('/api/data')
} catch (error) {
    // จัดการ error
}
```

## ข้อควรระวัง

1. อย่าเก็บ sensitive data ใน localStorage
2. ตรวจสอบ token ก่อนใช้งานเสมอ
3. มี timeout ที่เหมาะสม
4. จัดการ error ทุกกรณี
5. ทำ cleanup เมื่อ logout
