import React from 'react';
import SearchBar from '../components/SearchBar';

export default function MarketplacePage() {
    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100">
        <div className="col-span-1 bg-white">
            <span>Sponsor</span>
        </div>
        <div className="col-span-3">

            <SearchBar title="Marketplace"/>

            {/* Herobanner */}
        </div>
    </div>
    );
}