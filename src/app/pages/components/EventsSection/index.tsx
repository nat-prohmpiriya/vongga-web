'use client';

import React from 'react';
import Image from 'next/image';
import { FaLocationDot, FaCalendarDays } from "react-icons/fa6";

interface Event {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  location: string;
  attendees: number;
}

interface EventsSectionProps {
  events?: Event[];
}

const EventsSection: React.FC<EventsSectionProps> = () => {
  const events = () => {
    return Array.from({ length: 5 }, (_, index) => ({
      id: `event-${index + 1}`,
      title: 'Comedy on the green',
      imageUrl: `https://picsum.photos/800/400?random=${index + 1}`,
      date: 'Mon, Sep 25, 2024 at 9:30 AM',
      location: 'San francisco',
      attendees: Math.floor(Math.random() * 100) + 1,
    }));
  }

  return (
    <div className="p-4 bg-white rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Discover Events</h2>
        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
          + Create events
        </button>
      </div>

      {/* Alert Section */}
      <div className="bg-green-100 p-4 rounded-lg mb-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="font-medium">Upcoming event:</span>
          <span>The learning conference on Sep 19 2024</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            View event
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-4">
        {events().map((event) => (
          <div key={event.id} className="flex gap-4 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative w-48 h-32">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 p-4">
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <div className="flex flex-col gap-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaCalendarDays className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaLocationDot className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{event.attendees} going</span>
                </div>
              </div>
            </div>
            <button className="self-center mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors">
              ⋮
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;
