'use client'
import SearchBar from '@/app/components/SearchBar'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

export default function WatchPage() {
    const router = useRouter()

    const sectionsContent = (number = 6) => {
        return Array.from({ length: number }).map((_, index) => (
            <div
                key={uuidv4()}
                className="space-y-3 space-x-3 bg-white rounded-lg"
                onClick={() => router.push('/watch/' + uuidv4())}
            >
                <img
                    src={`https://picsum.photos/100${index}/100${index}`}
                    alt="Banner"
                    className=" object-cover h-[192px] w-full"
                />
                <div className="px-2 py-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        {/* avatar */}
                        <img
                            src={`https://picsum.photos/30${index}/30${index}`}
                            alt="Banner"
                            className=" object-cover rounded-full w-8 h-8"
                        />
                        <span className="text-gray-400">
                            Lorem ipsum dolor sit amet.{' '}
                        </span>
                    </h3>
                    <p className="text-gray-400">Chanel name</p>
                    <p className="text-gray-500 text-xs mt-1 flex justify-between">
                        <span>view 1.2k</span> <span>4 days ago</span>
                    </p>
                </div>
            </div>
        ))
    }

    const shorts = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <div
                key={uuidv4()}
                className="space-y-3 space-x-3 my-4 bg-white rounded-lg"
                onClick={() => router.push('/watch/' + uuidv4())}
            >
                <img
                    src={`https://picsum.photos/100${index}/100${index}`}
                    alt="Banner"
                    className=" object-cover h-[300px] w-full"
                />
                <div className="px-1 py-1">
                    <span className="text-lg font-semibold flex items-center gap-2">
                        {/* avatar */}
                        <img
                            src={`https://picsum.photos/30${index}/30${index}`}
                            alt="Banner"
                            className=" object-cover rounded-full w-8 h-8"
                        />
                        <h3 className="text-gray-400">Lorem ipsum... </h3>
                    </span>
                    <p className="text-gray-500 text-xs mt-1 flex justify-between">
                        <span>view 1.2k</span> <span>4 days ago</span>
                    </p>
                </div>
            </div>
        ))
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-100">
            <div className="col-span-1 bg-white">
                <span>Sponsor</span>
            </div>
            <div className="col-span-3">
                <SearchBar title="Watch" />
                <h3 className="text-lg font-semibold">Shorts</h3>
                <div className="grid grid-cols-5 gap-2">{shorts()}</div>
                <div className="grid grid-cols-3 gap-2">
                    {sectionsContent(9)}
                </div>
                <div className="grid grid-cols-3 gap-2 pt-4">
                    {sectionsContent(9)}
                </div>
            </div>
        </div>
    )
}
