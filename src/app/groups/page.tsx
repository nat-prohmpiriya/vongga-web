import { TextInput } from "flowbite-react";

export default function EventPage() {
    const categoryGroups = [
        { id: 1, name: 'Travel' },
        { id: 2, name: 'Education' },
        { id: 3, name: 'Music' },
        { id: 4, name: 'Sports' },
        { id: 5, name: 'Health' },
        { id: 6, name: 'Art' },
        { id: 7, name: 'Fashion' },
        { id: 8, name: 'Food' },
        { id: 9, name: 'Technology' },
        { id: 10, name: 'Business' },
        { id: 11, name: 'Politics' },
        { id: 12, name: 'Science' },
        { id: 13, name: 'Environment' },
        { id: 14, name: 'Culture' },
        { id: 15, name: 'Religion' },
    ]
    return (
        <div className="bg-gray-100 p-4 grid grid-cols-4 gap-4">
            {/* sidebar */}
            <div className="col-span-1">
                <div className="bg-white rounded-xl p-4 space-y-2 flex flex-col">
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">Explore Groups</button>
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">Your Groups</button>
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
                <div className="mb-4 bg-white rounded-xl p-4">
                    <div className="grid grid-cols-2">
                        <div className="col-span-1">
                            <input 
                                type="text" 
                                placeholder="Search Groups" 
                                className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="col-span-1 flex justify-end">
                            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                                Create Group
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 flex flex-row flex-wrap gap-4">
                        {
                            categoryGroups.map((group) => (
                                <div key={group.id} className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                                    {group.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
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
                    {
                        Array.from({ length: 8 }, (_, index) => (
                            <div key={index} className="col-span-1 space-4 h-[350px] bg-white rounded-xl">
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
                        ))
                    }
                </div>
            </div>  
        </div>
    );
}