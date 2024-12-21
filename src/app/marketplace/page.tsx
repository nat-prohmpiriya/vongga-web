"use client"
import { v4 as uuidv4 } from 'uuid';
import ProductCard from "./components/ProductCard";

export default function MarketplacePage() {

    const products = (number: number) => {
        return Array.from({ length: number }, (_, index) => ({
            id: uuidv4(),
            title: `Product ${index + 1}`,
            imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
            price: Math.floor(Math.random() * 100) + 1,
            originalPrice: Math.floor(Math.random() * 100) + 1,
            discount: Math.floor(Math.random() * 100) + 1,
            rating: Math.floor(Math.random() * 5) + 1,
            sales: Math.floor(Math.random() * 1000) + 1,
            isFreeShipping: Math.random() < 0.5,
            isHot: Math.random() < 0.5,
        }));
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100">
            <div className="col-span-1 bg-white">
                <span>Sponsor</span>
            </div>
            <div className="col-span-3">
                {/* Herobanner */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                        <img src="https://picsum.photos/1500/700" alt="Banner" className="w-full h-[400px] object-cover rounded-md" />
                    </div>
                    <div className="col-span-1 space-y-2">
                        <div>
                            <img src="https://picsum.photos/1500/703" alt="Banner" className="w-full h-[196px] object-cover rounded-md" />
                        </div>
                        <div>
                            <img src="https://picsum.photos/1500/704" alt="Banner" className="w-full h-[196px] object-cover rounded-md" />
                        </div>
                    </div>
                </div>
                {/* categories */}
                <div className="mt-4 bg-white rounded-md p-4">
                    <h1 className="text-xl font-semibold">Categories</h1>
                    <div className="mt-2 grid grid-cols-12 gap-2">
                        {
                            Array.from({ length: 24 }).map((_, index) => (
                                <div key={index} className="">
                                    <img src={`https://picsum.photos/200?random=${index + 1}`} alt="Banner" className="w-12 h-12 object-cover rounded-full" />
                                    <span className="ml-2">cate {index + 1}</span>
                                </div>
                            ))
                        }
                    </div>

                </div>
                <div className="mt-2">
                    <h1 className="text-xl font-semibold mb-2">Popular Products</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {products(20).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}