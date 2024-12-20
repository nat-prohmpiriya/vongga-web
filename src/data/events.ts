import { v4 as uuidv4 } from 'uuid';

function createEventCard() {
    const listNumberRandom = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100
    return {
        image: `https://picsum.photos/800/600?random=${listNumberRandom}`,
        title: 'Bone thugs-n-harmony',
        date: 'Mon, Dec 23, 2024 at 6:24 PM',
        location: 'San Francisco',
        isOnline: true,
        category: 'Spa training',
        attendees: [
            { id: 1, image: 'https://picsum.photos/32/32?random=1' },
            { id: 2, image: 'https://picsum.photos/32/32?random=2' },
            { id: 3, image: 'https://picsum.photos/32/32?random=3' },
        ],
        totalAttendees: 21,
        id: uuidv4(),
    };
}
const listEvents = [];
for (let i = 0; i < 8; i++) {
    listEvents.push(createEventCard());
}

export default {
    populaEvents: listEvents,
    upcomingEvents: [
        // Upcoming events
    ],
    pastEvents: [
        // Past events
    ],
    featuredEvents: [
        // Featured events
    ]
}