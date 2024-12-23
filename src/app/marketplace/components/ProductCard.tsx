import { FaTruck, FaFire } from 'react-icons/fa6'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProductCard({ product }: any) {
    const router = useRouter()
    return (
        <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/marketplace/${product.id}`)}
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
                <h3 className="text-sm line-clamp-2 mb-2">{product.title}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-red-500">฿{product.price}</span>
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
    )
}
