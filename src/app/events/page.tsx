
import EventCard from './components/EventCard'
import eventsData from '@/data/events'
import SearchBar from '../components/SearchBar'
import serverToken from '@/utils/serverToken'

export default async function EventPage(params: { name: string }) {
    try {
        const name = await params.name

        const accessToken = (await serverToken.getToken()).accessToken
        const url = process.env.NEXT_PUBLIC_VONGGA_API_URL + `/users/nutprohmpiriya7808`
        console.log(url)
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        const data = await response.json()
        console.log(data)
        console.log(data.user)
    } catch (error: any) {
        console.error('Error fetching user:', error.message)
    }
    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100">
            <div className="col-span-1 bg-white rounded-xl p-4">
                <h1>Sidebar</h1>
            </div>
            <div className="col-span-3 space-y-6">
                <SearchBar title="Events" />
                {/* HeroBanner */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <img
                            src="https://picsum.photos/1500/701"
                            alt="Banner"
                            className="w-full h-[400px] object-cover rounded-xl"
                        />
                    </div>
                    <div className="col-span-1 space-y-4">
                        <img
                            src="https://picsum.photos/1500/702"
                            alt="Banner"
                            className="w-full h-[192px] object-cover rounded-xl"
                        />
                        <img
                            src="https://picsum.photos/1500/700"
                            alt="Banner"
                            className="w-full h-[192px] object-cover rounded-xl"
                        />
                    </div>
                </div>

                {/* Popular Events */}
                <div className="bg-white rounded-xl p-4">
                    <h3 className="text-2xl font-semibold mb-4">
                        Popular Events
                    </h3>
                    <div className="grid grid-cols-4 gap-6">
                        {eventsData.populaEvents.map((event, index) => (
                            <EventCard key={index} {...event} />
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-xl p-4">
                    <h3 className="text-2xl font-semibold mb-4">
                        Upcoming Events
                    </h3>
                    <div className="grid grid-cols-4 gap-6">
                        {eventsData.populaEvents.map((event, index) => (
                            <EventCard key={index} {...event} />
                        ))}
                    </div>
                </div>

                {/* New Events */}
                <div className="bg-white rounded-xl p-4">
                    <h3 className="text-2xl font-semibold mb-4">New Events</h3>
                    <div className="grid grid-cols-4 gap-6">
                        {eventsData.populaEvents.map((event, index) => (
                            <EventCard key={index} {...event} />
                        ))}
                    </div>
                </div>

                {/* Music & Festivals */}
                <div className="bg-white rounded-xl p-4">
                    <h3 className="text-2xl font-semibold mb-4">
                        Music & Festivals
                    </h3>
                    <div className="grid grid-cols-4 gap-6">
                        {eventsData.populaEvents.map((event, index) => (
                            <EventCard key={index} {...event} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
