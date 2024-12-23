import { v4 as uuidv4 } from 'uuid'

const users = [
    {
        id: 1,
        name: 'Sam Lanson',
        connections: 250,
        position: 'Lead Developer',
        location: 'New Hampshire',
        joinedDate: 'Nov 26, 2019',
        isVerified: true,
    },
    {
        id: 2,
        name: 'Lori Ferguson',
        connections: 250,
        position: 'Software developer',
        location: 'Los Angeles',
        joinedDate: 'Jan 26, 2015',
        isVerified: true,
    },
]

export function getUsers(id: number) {
    return users.find((user) => user.id === id)
}
