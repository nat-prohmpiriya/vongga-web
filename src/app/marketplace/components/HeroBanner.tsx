'use client'

import { useRouter } from 'next/navigation'
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
    isFreeShipping: boolean
    isHot: boolean
}

export default function HeroBanner() {
    const router = useRouter()

    const featuredProducts: Product[] = [
        {
            id: '1',
            title: 'สินค้าแนะนำ 1',
            imageUrl: 'https://picsum.photos/800/800?random=1',
            price: 299,
            originalPrice: 599,
            discount: 50,
            rating: 4.9,
            sales: 1200,
            isFreeShipping: true,
            isHot: true,
        },
        {
            id: '2',
            title: 'สินค้าแนะนำ 2',
            imageUrl: 'https://picsum.photos/800/800?random=2',
            price: 399,
            originalPrice: 799,
            discount: 50,
            rating: 4.8,
            sales: 800,
            isFreeShipping: true,
            isHot: false,
        },
        {
            id: '3',
            title: 'สินค้าแนะนำ 3',
            imageUrl: 'https://picsum.photos/800/800?random=3',
            price: 499,
            originalPrice: 999,
            discount: 50,
            rating: 4.7,
            sales: 500,
            isFreeShipping: false,
            isHot: true,
        },
    ]

    const ProductBanner = ({ product }: { product: Product }) => (
        <div
            className="group relative cursor-pointer overflow-hidden rounded-lg"
            onClick={() => router.push(`/marketplace/${product.id}`)}
        >
            <div className="relative aspect-[16/9]">
                <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isFreeShipping && (
                        <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                            <FaTruck className="w-4 h-4" />
                            <span>ส่งฟรี</span>
                        </div>
                    )}
                    {product.isHot && (
                        <div className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                            <FaFire className="w-4 h-4" />
                            <span>สินค้าขายดี</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold mb-2">
                        {product.title}
                    </h3>
                    <div className="flex items-center gap-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">
                                ฿{product.price}
                            </span>
                            <span className="text-sm line-through opacity-75">
                                ฿{product.originalPrice}
                            </span>
                            <span className="text-sm bg-red-600 px-2 py-1 rounded">
                                -{product.discount}%
                            </span>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="text-yellow-400">★</span>
                            <span className="ml-1">{product.rating}</span>
                            <span className="mx-1">|</span>
                            <span>ขายแล้ว {product.sales}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
                <ProductBanner product={featuredProducts[0]} />
            </div>
            <div className="col-span-1 space-y-4">
                <ProductBanner product={featuredProducts[1]} />
                <ProductBanner product={featuredProducts[2]} />
            </div>
        </div>
    )
}
