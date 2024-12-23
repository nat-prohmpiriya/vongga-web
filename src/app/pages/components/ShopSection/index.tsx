'use client'

import React from 'react'
import Image from 'next/image'
import { FaTruck, FaFire } from 'react-icons/fa6'

interface Product {
    id: string
    title: string
    imageUrl: string
    price: number
    originalPrice: number
    discount: number
    rating: number
    sales: number
    isFreeShipping?: boolean
    isHot?: boolean
}

interface ShopSectionProps {
    products?: Product[]
}

const ShopSection: React.FC<ShopSectionProps> = () => {
    const products = () => {
        const numberRandom = Math.floor(Math.random() * 100) + 1
        return Array.from({ length: numberRandom }, (_, index) => ({
            id: `product-${index + 1}`,
            title: `Product ${index + 1}`,
            imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
            price: Math.floor(Math.random() * 100) + 1,
            originalPrice: Math.floor(Math.random() * 100) + 1,
            discount: Math.floor(Math.random() * 100) + 1,
            rating: Math.floor(Math.random() * 5) + 1,
            sales: Math.floor(Math.random() * 1000) + 1,
            isFreeShipping: Math.random() < 0.5,
            isHot: Math.random() < 0.5,
        }))
    }

    return (
        <div className="p-4 bg-white rounded-md">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Shop</h2>
                <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    + Add Product
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {products().map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                    >
                        {/* Product Image */}
                        <div className="relative aspect-square">
                            <Image
                                src={product.imageUrl}
                                alt={product.title}
                                fill
                                className="object-cover"
                            />
                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                                {product.isFreeShipping && (
                                    <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                                        <FaTruck className="w-3 h-3" />
                                        <span>ส่งฟรี</span>
                                    </div>
                                )}
                                {product.isHot && (
                                    <div className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                                        <FaFire className="w-3 h-3" />
                                        <span>ถูกมาก</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-3">
                            <h3 className="text-sm line-clamp-2 mb-2">
                                {product.title}
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-red-500">
                                    ฿{product.price}
                                </span>
                                <span className="text-xs text-gray-400 line-through">
                                    ฿{product.originalPrice}
                                </span>
                                <span className="text-xs text-red-500">
                                    -{product.discount}%
                                </span>
                            </div>
                            <div className="flex items-center text-xs text-gray-500 mt-2">
                                <span className="text-yellow-400">★</span>
                                <span className="ml-1">{product.rating}</span>
                                <span className="mx-1">ขายแล้ว</span>
                                <span>{product.sales}K</span>
                                <span className="ml-1">ชิ้น</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShopSection
