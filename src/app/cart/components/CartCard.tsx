import { IoStorefrontOutline } from 'react-icons/io5'

interface CartCardProps {
    id: number
    storeName: string
    productName: string
    variant: string
    price: number
    quantity: number
    imageUrl: string
    onQuantityChange: (id: number, quantity: number) => void
}

const CartCard: React.FC<CartCardProps> = ({
    id,
    storeName,
    productName,
    variant,
    price,
    quantity,
    imageUrl,
    onQuantityChange,
}) => {
    return (
        <div className="flex flex-col w-full bg-white p-4 rounded-lg mb-4 border border-gray-200">
            {/* Store Header */}
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
                <input type="checkbox" className="w-4 h-4" />
                <IoStorefrontOutline className="text-xl" />
                <span className="font-medium">{storeName}</span>
            </div>

            {/* Product Details */}
            <div className="flex gap-4 ">
                <input type="checkbox" className="w-4 h-4 mt-2" />

                {/* Product Image */}
                <div className="w-24 h-24 relative">
                    <img
                        src={imageUrl}
                        alt={productName}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div className="flex-1">
                            <h3 className="font-medium mb-1">{productName}</h3>
                            <div className="text-sm text-gray-600 mb-2">
                                <span>ตัวเลือกสินค้า: </span>
                                <span>{variant}</span>
                            </div>
                            <div className="text-lg font-semibold text-orange-500">
                                ฿{price.toLocaleString()}
                            </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-start gap-2">
                            <button
                                onClick={() =>
                                    onQuantityChange(id, quantity - 1)
                                }
                                className="px-3 py-1 border rounded-md hover:bg-gray-100"
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) =>
                                    onQuantityChange(id, Number(e.target.value))
                                }
                                className="w-12 text-center border rounded-md py-1"
                                min="1"
                            />
                            <button
                                onClick={() =>
                                    onQuantityChange(id, quantity + 1)
                                }
                                className="px-3 py-1 border rounded-md hover:bg-gray-100"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Find Similar Products Link */}
                    <div className="mt-2 text-right">
                        <button className="text-orange-500 text-sm hover:underline">
                            ค้นหาสินค้าที่คล้ายกัน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartCard
