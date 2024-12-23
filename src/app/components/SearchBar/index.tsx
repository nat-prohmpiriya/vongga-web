export default function SearchBar({ title }: { title: string }) {
    const categories = [
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
        <div className="mb-4 bg-white rounded-xl p-4">
            <div className="grid grid-cols-2">
                <div className="col-span-1">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="col-span-1 flex justify-end">
                    <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                        Create {title}
                    </button>
                </div>
            </div>
            <div className="mt-4 flex flex-row flex-wrap gap-4">
                {categories.map((group) => (
                    <div
                        key={group.id}
                        className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        {group.name}
                    </div>
                ))}
            </div>
        </div>
    )
}
