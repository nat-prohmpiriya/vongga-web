'use client'

import { useState } from 'react'
import CartCard from '@/components/cart/CartCard'

const CartPage = () => {
    const [cartItems, setCartItems] = useState(() =>
        Array.from({ length: 10 }, (_, index) => ({
            id: index + 1,
            storeName: `Store ${index + 1}`,
            productName: `Product ${index + 1}`,
            variant: `Variant ${index + 1}`,
            price: Math.floor(Math.random() * 1000) + 100,
            quantity: 1,
            imageUrl: `https://picsum.photos/200?random=${index + 1}`,
        }))
    )

    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return

        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    return (
        <div className="mx-auto p-4 bg-gray-100">
            <div className="w-3/4 mx-auto">
                <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <CartCard
                            key={item.id}
                            id={item.id}
                            storeName={item.storeName}
                            productName={item.productName}
                            variant={item.variant}
                            price={item.price}
                            quantity={item.quantity}
                            imageUrl={item.imageUrl}
                            onQuantityChange={handleQuantityChange}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CartPage
