import SearchBar from "@/app/components/SearchBar";

export default function ArticlesPage() {

    const ArticlesSection = ({ title }: { title: string }) => {
        return (
            <div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-lg">
                    {
                        Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className="space-y-3 space-x-3">
                                <img src={`https://picsum.photos/100${index}/100${index}`} alt="Banner" className=" object-cover" />
                                <div>
                                    <h3 className="text-lg font-semibold">Lorem ipsum dolor sit amet.</h3>
                                    <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, quos.</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    const ArticleSection2 = ({ title }: { title: string }) => {
        return (
            <div >
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <div className="grid grid-cols-2 gap-2 bg-white p-4 rounded-lg">
                    {
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="grid grid-cols-2 gap-2">
                                <img src={`https://picsum.photos/30${index}/30${index}`} alt="Banner" className=" object-cover" />
                                <div>
                                    <h3 className="text-lg font-semibold">Lorem ipsum dolor sit amet.</h3>
                                    <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias aspernatur ratione facere nisi totam enim eum, aut earum obcaecati dicta.</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 grid grid-cols-4 gap-4">
            <div className="col-span-1 space-y-4">
                <p>Sponsors</p>
            </div>
            <div className="col-span-3 space-y-4">
                {/* Search Bar */}
                <SearchBar title="Articles"/>

                {/* Popular Articles 10*/}
                <div className="grid grid-cols-5 gap-4 bg-white p-4 rounded-lg">
                    <div className="col-span-3 rounded-xl relative">
                        <img src="https://picsum.photos/1501/701" alt="Banner" className="w-full h-[550px] object-cover" />
                        <p className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap absolute bottom-20 left-4 text-white">
                            Lorem ipsum dolor sit amet.
                        </p>
                        <p className="absolute bottom-4 left-4 right-4 text-white">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque saepe obcaecati numquam temporibus vitae autem! Sunt numquam nihil neque dicta.
                        </p>
                    </div>
                    <div className="col-span-2 space-y-2 h-[500px]">
                        {
                            Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="space-y-3 flex flex-row space-x-3">
                                    <img src={`https://picsum.photos/10${index}/10${index}`} alt="Banner" className=" object-cover" />
                                    <div>
                                        <h3 className="text-lg font-semibold">Lorem ipsum dolor sit amet.</h3>
                                        <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, quos.</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    
                </div>

                <ArticlesSection title="Latest Articles" />
                <ArticleSection2 title="Most Popular" />
                {/* <ArticlesSection title="Latest Videos" />
                <ArticlesSection title="Finance" />
                <ArticlesSection title="Entertainment" />
                <ArticlesSection title="Travel" />
                <ArticlesSection title="Environment" />
                <ArticlesSection title="Culture" />
                <ArticlesSection title="Religion" /> */}
                
            </div>
        </div>
    );
}