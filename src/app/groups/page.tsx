import SearchBar from '../../components/common/SearchBar'

export default function EventPage() {
    return (
        <div className="bg-gray-100 p-4 grid grid-cols-4 gap-4">
            {/* sidebar */}
            <div className="col-span-1">
                <div className="bg-white rounded-xl p-4 space-y-2 flex flex-col">
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                        Explore Groups
                    </button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                        Your Groups
                    </button>
                </div>
                <div className="bg-white h-[350px] rounded-xl p-4 mt-4">
                    <p>Sponsors 1</p>
                </div>
                <div className="bg-white h-[350px] rounded-xl p-4 mt-4">
                    <p>Sponsors 2</p>
                </div>
                <div className="bg-white h-[350px] rounded-xl p-4 mt-4">
                    <p>Sponsors 3</p>
                </div>
            </div>
            {/* content */}
            <div className="col-span-3 space-y-6">
                {/* Search Bar */}
                <SearchBar title="Groups" />
                {/* Popular Groups */}
                <div>
                    <h1 className="text-xl font-semibold">Popular Groups</h1>
                </div>
                <div className="mb-4 rounded-xl grid grid-cols-3 gap-4">
                    <div className="col-span-1 h-[565px] bg-white rounded-xl">
                        <img
                            src="https://picsum.photos/1500/701"
                            alt="Banner"
                            className="w-full h-[425px] object-cover "
                        />
                        <div className="p-4">
                            <h3>Title</h3>
                            <p>Description 1</p>
                            <p>Description 2</p>
                            <p>Members 500+</p>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                        <div className="h-[275px] bg-white rounded-xl">
                            <img
                                src="https://picsum.photos/1500/702"
                                alt="Banner"
                                className="w-full h-[192px] object-cover"
                            />
                            <div className="p-4">
                                <h3>Title</h3>
                                <p>Description</p>
                            </div>
                        </div>
                        <div className="h-[275px] bg-white rounded-xl">
                            <img
                                src="https://picsum.photos/1500/702"
                                alt="Banner"
                                className="w-full h-[192px] object-cover"
                            />
                            <div className="p-4">
                                <h3>Title</h3>
                                <p>Description</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 space-y-4">
                        <div className="h-[275px] bg-white rounded-xl">
                            <img
                                src="https://picsum.photos/1500/703"
                                alt="Banner"
                                className="w-full h-[192px] object-cover"
                            />
                            <div className="p-4">
                                <h3>Title</h3>
                                <p>Description</p>
                            </div>
                        </div>
                        <div className="h-[275px] bg-white rounded-xl">
                            <img
                                src="https://picsum.photos/1500/704"
                                alt="Banner"
                                className="w-full h-[192px] object-cover"
                            />
                            <div className="p-4">
                                <h3>Title</h3>
                                <p>Description</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl font-semibold">All Groups</h1>
                </div>
                <div className="mb-4 rounded-xl grid grid-cols-4 gap-4">
                    {Array.from({ length: 8 }, (_, index) => (
                        <div
                            key={index}
                            className="col-span-1 space-4 h-[350px] bg-white rounded-xl"
                        >
                            <img
                                src={`https://picsum.photos/1500/70${index + 1}`}
                                alt="Banner"
                                className="object-cover h-[250px]"
                            />
                            <div className="px-4 py-2">
                                <h3>Title</h3>
                                <p>Description</p>
                            </div>
                            <div className="h-4 bg-white rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
