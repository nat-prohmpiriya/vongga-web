'use client'

import { useState } from 'react'
import {
    FaStar,
    FaHeart,
    FaShare,
    FaMinus,
    FaPlus,
    FaShoppingCart,
} from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

interface Variant {
    id: string
    name: string
    image: string
}

export default function HeroBannerProductDetail() {
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedVariant, setSelectedVariant] = useState('')
    const [quantity, setQuantity] = useState(1)

    const images = [
        'https://picsum.photos/800/800?random=1',
        'https://picsum.photos/800/800?random=2',
        'https://picsum.photos/800/800?random=3',
        'https://picsum.photos/800/800?random=4',
        'https://picsum.photos/800/800?random=5',
    ]

    const variants: Variant[] = [
        {
            id: '1',
            name: '7ชิ้น-สีครีม',
            image: 'https://picsum.photos/50/50?random=1',
        },
        {
            id: '2',
            name: '7ชิ้น-สีดำ',
            image: 'https://picsum.photos/50/50?random=2',
        },
        {
            id: '3',
            name: '7ชิ้น-น้ำเงิน',
            image: 'https://picsum.photos/50/50?random=3',
        },
        {
            id: '4',
            name: '7ชิ้น-เทา',
            image: 'https://picsum.photos/50/50?random=4',
        },
        {
            id: '5',
            name: '7ชิ้น-น้ำเงินเข้ม',
            image: 'https://picsum.photos/50/50?random=5',
        },
    ]

    return (
        <div className="mx-auto">
            {/* Breadcrumb */}

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-12 gap-8">
                    {/* Product Images */}
                    <div className="col-span-5">
                        <div className="relative aspect-square mb-4">
                            <img
                                src={images[selectedImage]}
                                alt="Product"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer border-2 rounded-lg overflow-hidden aspect-square ${
                                        selectedImage === index
                                            ? 'border-red-500'
                                            : 'border-gray-200'
                                    }`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex gap-4">
                            <button className="flex items-center gap-2 text-gray-500 hover:opacity-80">
                                <FaShare /> Share
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:opacity-80">
                                <FaHeart /> Favorite (8.3พัน)
                            </button>
                            <button className="flex items-center gap-2 text-gray-500 hover:opacity-80">
                                รายงานสินค้า
                            </button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="col-span-7">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded">
                                Mall
                            </span>
                            <h1 className="text-xl">
                                7 ชิ้น Set กระเป๋าเก็บของกันน้ำ
                                สำหรับกระเป๋าเดินทาง กระเป๋าชุด # B-208
                            </h1>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center">
                                <span className="text-red-500 mr-1">4.9</span>
                                <div className="flex text-yellow-400">
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <FaStar key={i} />
                                        ))}
                                </div>
                            </div>
                            <span className="text-gray-500">
                                2.7พัน Ratings
                            </span>
                            <span className="text-gray-500">
                                9.4พัน ขายแล้ว
                            </span>
                        </div>

                        <div className="bg-gray-50 p-4 mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-gray-500 text-sm line-through">
                                    ฿299
                                </span>
                                <span className="text-red-500 text-3xl font-semibold">
                                    ฿152 - ฿153
                                </span>
                                <span className="bg-red-500 text-white text-sm px-2 rounded">
                                    -49%
                                </span>
                            </div>
                            <div className="mt-2 text-sm">
                                <span className="text-red-500">ลด ฿5</span>
                                <span className="mx-2">|</span>
                                <span className="text-red-500">ลด ฿200</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-sm">Bundle Deals</span>
                                <button className="ml-2 border border-red-500 text-red-500 text-sm px-2 py-1 rounded hover:bg-red-50">
                                    ซื้อ 2 ชิ้น ลด 1%
                                </button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <span className="text-gray-500 w-24">
                                    การจัดส่ง
                                </span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <IoMdCheckmarkCircleOutline className="text-green-500" />
                                        <span>
                                            การจัดส่ง ถึง เขตบึงกุ่ม,
                                            จังหวัดกรุงเทพมหานคร
                                        </span>
                                    </div>
                                    <div className="text-gray-500 mt-1">
                                        ค่าจัดส่ง ฿29 - ฿100
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <span className="text-gray-500 w-24">สี</span>
                                <div className="grid grid-cols-5 gap-2">
                                    {variants.map((variant) => (
                                        <div
                                            key={variant.id}
                                            className={`flex items-center gap-2 border rounded-lg p-2 cursor-pointer hover:border-red-500 ${
                                                selectedVariant === variant.id
                                                    ? 'border-red-500'
                                                    : 'border-gray-200'
                                            }`}
                                            onClick={() =>
                                                setSelectedVariant(variant.id)
                                            }
                                        >
                                            <img
                                                src={variant.image}
                                                alt={variant.name}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="text-sm">
                                                {variant.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span className="text-gray-500 w-24">
                                    จำนวน
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        className="p-2 border rounded-lg hover:border-red-500"
                                        onClick={() =>
                                            setQuantity(
                                                Math.max(1, quantity - 1)
                                            )
                                        }
                                    >
                                        <FaMinus />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) =>
                                            setQuantity(
                                                Math.max(
                                                    1,
                                                    parseInt(e.target.value) ||
                                                        1
                                                )
                                            )
                                        }
                                        className="w-16 text-center border rounded-lg p-2"
                                    />
                                    <button
                                        className="p-2 border rounded-lg hover:border-red-500"
                                        onClick={() =>
                                            setQuantity(quantity + 1)
                                        }
                                    >
                                        <FaPlus />
                                    </button>
                                    <span className="text-gray-500 ml-4">
                                        มีสินค้าทั้งหมด 1721 ชิ้น
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button className="flex-1 flex items-center justify-center gap-2 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50">
                                <FaShoppingCart />
                                เพิ่มไปยังรถเข็น
                            </button>
                            <button className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">
                                ซื้อสินค้า
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
