// output: number in seconds
export default function getVideoDration(url: string) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video')
        video.onloadedmetadata = () => {
            resolve(video.duration)
        }
        video.onerror = (e) => {
            reject(e)
        }
        video.src = url
        video.load()
    })
}