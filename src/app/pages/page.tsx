'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import HeroBanner from "./components/HeroBanner";
import AboutSection from "./components/AboutSection";
import ConnectionsSection from "./components/ConnectionSection";
import GallerySection from "./components/GallerySection";
import VideosSection from "./components/VideosSection";
import EventsSection from "./components/EventsSection";
import ShopSection from "./components/ShopSection";
import FeedSection from "./components/FeedSection";


export default function PagesPage() {
    const profileData = {
        name: "Sam Lanson",
        connections: 250,
        position: "Lead Developer",
        location: "New Hampshire",
        joinedDate: "Nov 26, 2019",
        isVerified: true,
    };

    const [ currentSection, setCurrentSection ] = useState('');

    const searchParams = useSearchParams();
    const section = searchParams.get('section');

    useEffect(() => {
        console.log(section);
        setCurrentSection(section || '');
      }, [section]);


    return (
        <div className="p-4 bg-gray-100 grid grid-cols-4 gap-4">
            <div className="col-span-3  rounded-xl">
                <HeroBanner {...profileData} />

                {/* Section */}
                <div className="p-4 rounded-xl mt-4 ">
                    {currentSection === '' && <FeedSection />}
                    {currentSection === 'about' && <AboutSection />}
                    {currentSection === 'connections' && <ConnectionsSection />}
                    {currentSection === 'media' && <GallerySection />}
                    {currentSection === 'videos' && <VideosSection />}
                    {currentSection === 'events' && <EventsSection />}
                    {currentSection === 'shop' && <ShopSection />}
                </div>
            </div>
            <div className="col-span-1 bg-white rounded-xl">
            </div>
        </div>
    );
}