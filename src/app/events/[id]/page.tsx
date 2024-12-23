'use client'

import { useParams } from 'next/navigation'

export default function EventDetailPage() {
    const params = useParams()
    const { id } = params
    return (
        <div>
            <h1>Event Detai. {id}</h1>
        </div>
    )
}
