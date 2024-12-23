'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'

interface Review {
    id: string
    username: string
    rating: number
    date: string
    variant: string
    content: string
    images: string[]
    sellerResponse?: string
}

export default function ReviewSection() {
    const reviews: Review[] = [
        {
            id: '1',
            username: 'kularbnantanomnuch',
            rating: 5,
            date: '2024-09-05 14:16',
            variant: '7ชิ้น-สีชมพู',
            content:
                'ส่งไว สินค้าตรงปก สีสวย ซิปดูดีไม่ติด แต่เสียดายแบบที่ใส่แปรงแต่งหน้าหมด ทางร้านเลยตอบแทนเป็นเงินคืนให้20บาท ทางร้านให้คำแนะนำดี',
            images: [
                'https://picsum.photos/800/800?random=1',
                'https://picsum.photos/800/800?random=2',
                'https://picsum.photos/800/800?random=3',
                'https://picsum.photos/800/800?random=4',
                'https://picsum.photos/800/800?random=5',
                'https://picsum.photos/800/800?random=6',
            ],
            sellerResponse:
                'ทางเราได้รับรีวิวดีๆ จากคุณแล้วค่ะ ทางเรารู้สึกเป็นเกียรติอย่างยิ่งที่ได้รับการยอมรับจากคุณค่ะ และหวังว่าจะได้ให้บริการคุณอีกครั้งนะคะ',
        },
        {
            id: '2',
            username: 'b****g',
            rating: 5,
            date: '2024-09-04 10:57',
            variant: '7ชิ้น-เทา',
            content:
                'ร้านจัดส่งไว ราคาไม่แพง กระเป๋าเป็นตัวช่วยร่วมชิ้งร้ายแห่งชาติ น้ำหนักเบามากของใต้เยอะ ทางร้านจัดส่งไวดีค่ะ',
            images: [
                'https://picsum.photos/800/800?random=1',
                'https://picsum.photos/800/800?random=2',
                'https://picsum.photos/800/800?random=3',
                'https://picsum.photos/800/800?random=4',
            ],
        },
    ]

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">คะแนนของสินค้า</h2>

                {/* Rating Overview */}
                <div className="flex gap-8 p-6 bg-gray-50 rounded-lg">
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-3xl font-bold text-red-500">
                            4.9
                        </div>
                        <div className="text-sm text-gray-500">เต็ม 5</div>
                        <div className="flex text-yellow-400 mt-1">
                            {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                        </div>
                    </div>

                    {/* Rating Filters */}
                    <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50">
                            ทั้งหมด
                        </button>
                        <button className="px-4 py-2 border text-gray-500 rounded-lg hover:bg-gray-50">
                            5 ดาว (2.4พัน)
                        </button>
                        <button className="px-4 py-2 border text-gray-500 rounded-lg hover:bg-gray-50">
                            4 ดาว (205)
                        </button>
                        <button className="px-4 py-2 border text-gray-500 rounded-lg hover:bg-gray-50">
                            3 ดาว (48)
                        </button>
                        <button className="px-4 py-2 border text-gray-500 rounded-lg hover:bg-gray-50">
                            2 ดาว (9)
                        </button>
                        <button className="px-4 py-2 border text-gray-500 rounded-lg hover:bg-gray-50">
                            1 ดาว (11)
                        </button>
                        <button className="px-4 py-2 border text-gray-500 rounded-lg hover:bg-gray-50">
                            ความคิดเห็น (435)
                        </button>
                        <button className="px-4 py-2 border text-gray-500 rounded-lg hover:bg-gray-50">
                            มีรูปภาพ/วีดีโอ (348)
                        </button>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="mt-6 space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                    <div>
                                        <div className="font-medium">
                                            {review.username}
                                        </div>
                                        <div className="flex text-yellow-400">
                                            {Array(review.rating)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className="w-3 h-3"
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <button className="text-gray-500 hover:bg-gray-100 p-1 rounded">
                                    <BsThreeDotsVertical />
                                </button>
                            </div>

                            <div className="mt-2 text-sm text-gray-500">
                                {review.date} | ตัวเลือกสินค้า: {review.variant}
                            </div>

                            <div className="mt-2">{review.content}</div>

                            {/* Review Images */}
                            <div className="mt-4 grid grid-cols-6 gap-2">
                                {review.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative aspect-square"
                                    >
                                        <img
                                            src={image}
                                            alt={`Review image ${index + 1}`}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        {index === 0 && (
                                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded">
                                                0:13
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Seller Response */}
                            {review.sellerResponse && (
                                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                    <div className="text-sm font-medium mb-2">
                                        การตอบกลับจากผู้ขาย
                                    </div>
                                    <div className="text-gray-600">
                                        {review.sellerResponse}
                                    </div>
                                </div>
                            )}

                            {/* Review Actions */}
                            <div className="mt-4 flex items-center gap-2">
                                <button className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1">
                                    <span>👍</span> มีประโยชน์ใช่ไหม?
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
