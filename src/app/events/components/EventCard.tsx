'use client';

import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export interface EventCardProps {
  image: string;
  title: string;
  date: string;
  location: string;
  isOnline?: boolean;
  category: string;
  attendees: {
    image: string;
    id: number;
  }[];
  totalAttendees: number;
  id: string;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  date,
  location,
  isOnline,
  category,
  attendees,
  totalAttendees,
  id,
}) => {
  const router = useRouter();
  const goToEventDetailPage = (id: string) => {
    router.push(`/events/${id}`);
  };
  return (
    <div className="bg-white rounded-xl overflow-hidden" onClick={() => goToEventDetailPage(id)}>
      {/* Event Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        {isOnline && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Online
          </span>
        )}
        <span className="absolute top-3 left-3 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
          {category}
        </span>
      </div>

      {/* Event Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <IoLocationOutline className="text-lg" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="text-sm text-gray-500 mb-4">{date}</div>

        {/* Attendees */}
        <div className="flex items-center justify-between">
          <div className="flex items-center -space-x-2">
            {attendees.slice(0, 3).map((attendee) => (
              <img
                key={attendee.id}
                src={attendee.image}
                alt="attendee"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
            ))}
            {totalAttendees > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                +{totalAttendees - 3}
              </div>
            )}
          </div>
          <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;