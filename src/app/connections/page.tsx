
import SearchBar from "../components/SearchBar";

export default function ConnectionsPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-4 grid grid-cols-4 gap-4">
            <div className="col-span-1 space-y-4 ">
                <div className="bg-white rounded-xl p-4 h-64">
                    <h1>Sponser 1</h1>
                </div>
                <div className="bg-white rounded-xl p-4 h-64">
                    <h1>Sponser 2</h1>
                </div>
                <div className="bg-white rounded-xl p-4 h-96">
                    <h1>Sponser 3</h1>
                </div>
            </div>
            <div className="col-span-3">
                {/* Search ar */}
                <SearchBar title="Connections"/>
                {/* Herobanner */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1 space-y-4">
                        <img
                            src="https://picsum.photos/1501/701"
                            alt="Banner"
                            className="w-full h-[192px] object-cover rounded-xl"
                        />
                        <img
                            src="https://picsum.photos/1502/702"
                            alt="Banner"
                            className="w-full h-[192px] object-cover rounded-xl"
                        />
                    </div>
                    <div className="col-span-1 space-y-4">
                        <img
                            src="https://picsum.photos/1503/703"
                            alt="Banner"
                            className="w-full h-[192px] object-cover rounded-xl"
                        />
                        <img
                            src="https://picsum.photos/1504/704"
                            alt="Banner"
                            className="w-full h-[192px] object-cover rounded-xl"
                        />
                    </div>
                    <div className="col-span-1">
                        <img
                            src="https://picsum.photos/1505/705"
                            alt="Banner"
                            className="w-full h-[400px] object-cover rounded-xl"
                        />
                    </div>
                </div>

                {/*People you may know  */}
                <div className="grid grid-cols-4 gap-4 mt-4">

                    
                </div>
            </div>
        </div>
    );
}