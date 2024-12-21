"use client";

import { useParams } from "next/navigation";
import HeroBannerProductDetail from "./components/HeroBannerProductDetail";
import ShopInfo from "./components/ShopInfo";
import ReviewSection from "./components/ReviewSection";
import ProductInfo from "./components/ProductInfo";
import ProductCard from "../components/ProductCard";
import { v4 as uuidv4 } from 'uuid';

export default function ProductDetailPage() {

    const params = useParams();
    const { id } = params;

    const productRelated = (number: number) => {
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
        <div className="p-4 bg-gray-100 space-y-4">
            <div className="mx-auto max-w-7xl">
                <HeroBannerProductDetail />
                <div className="mt-4">
                    <ShopInfo />
                </div>
                <div className="mt-4 grid grid-cols-4 gap-4">
                    <div className="col-span-3">
                        <ProductInfo />
                        <div className="mt-4"/>
                        <ReviewSection />
                    </div>
                    <div className="col-span-1">
                        <h1 className="text-lg font-semibold mb-2">Related Products</h1>
                        {productRelated(10).map((product) => (
                            <div key={product.id} className="mb-4">
                                <ProductCard key={product.id} product={product} />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}