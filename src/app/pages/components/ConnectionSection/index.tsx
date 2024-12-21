'use client';

import React from 'react';
import Image from 'next/image';

interface Connection {
  id: string;
  name: string;
  role: string;
  profileImage: string;
  sharedConnections: {
    names: string[];
    count?: number;
  };
}

interface GallerySectionProps {
  connections?: Connection[];
}

const ConnectionSection: React.FC<GallerySectionProps> = () => {
  const connections: Connection[] = [
    {
      id: '1',
      name: 'Frances Guerrero',
      role: 'Full Stack Web Developer',
      profileImage: 'https://picsum.photos/200?random=1',
      sharedConnections: {
        names: ['Carolyn Ortiz', 'Frances Guerrero'],
        count: 20
      }
    },
    {
      id: '2',
      name: 'Lori Ferguson',
      role: 'Web Developer | Freelancer',
      profileImage: 'https://picsum.photos/200?random=2',
      sharedConnections: {
        names: ['Amanda Reed', 'Lori Stevens'],
        count: 10
      }
    },
    {
      id: '3',
      name: 'Samuel Bishop',
      role: 'Full Stack Web Developer',
      profileImage: 'https://picsum.photos/200?random=3',
      sharedConnections: {
        names: ['Joan Wallace', 'Larry Lawson'],
      }
    },
    {
      id: '4',
      name: 'Dennis Barrett',
      role: 'Full Stack Web Developer',
      profileImage: 'https://picsum.photos/200?random=4',
      sharedConnections: {
        names: ['Samuel Bishop', 'Judy Nguyen'],
        count: 115
      }
    },
    {
      id: '5',
      name: 'Judy Nguyen',
      role: 'Full Stack Web Developer',
      profileImage: 'https://picsum.photos/200?random=5',
      sharedConnections: {
        names: ['Bryan Knight', 'Billy Vasquez'],
      }
    }
  ];

  const formatSharedConnections = (connection: Connection) => {
    const { names, count } = connection.sharedConnections;
    if (names.length === 0) return '';

    const nameText = names.join(', ');
    if (count) {
      return `${nameText}, and ${count} other shared connections`;
    }
    return `${nameText} shared connections`;
  };

  return (
    <div className="p-4 bg-white rounded-md">
      <h2 className="text-xl font-semibold mb-6">Connections</h2>
      
      <div className="space-y-4">
        {connections.map((connection) => (
          <div key={connection.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
            {/* Profile Image */}
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {connection.profileImage && (
                <Image
                  src={connection.profileImage}
                  alt={connection.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="font-medium">{connection.name}</h3>
              <p className="text-gray-600 text-sm">{connection.role}</p>
              <p className="text-gray-500 text-sm mt-1">
                {formatSharedConnections(connection)}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                Remove
              </button>
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Message
              </button>
            </div>
          </div>
        ))}

        {/* Load More Button */}
        <button className="w-full py-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors">
          Load more connections
        </button>
      </div>
    </div>
  );
};

export default ConnectionSection;
