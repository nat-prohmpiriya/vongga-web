
export default function Articles() {
    const listArticles = () => {
        const randomPublishedDate = (number: number) => new Date(number).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
        // create number random
        const randomNumber = Math.floor(Math.random() * 50);
        return Array.from({ length: 20 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg">
                <img
                    src={`https://picsum.photos/200?random=${index + 1}`}
                    alt="Banner"
                    className="w-full h-[200px] object-cover"
                />
                <div className="py-2 px-4">
                    <h2 className="text-lg font-semibold mt-2">Lorem ipsum dolor sit amet.</h2>
                    <p className="text-gray-500 text-xs mt-1 flex justify-between">
                        <span className="mr-2">Author</span>
                        <span>{randomPublishedDate(randomNumber)}</span>
                    </p>
                    <p className="text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus impedit similique doloremque libero tempora atque fugiat laudantium ad possimus magni.</p>
                </div>
            </div>
        ));
    }
    return (
        <div>
            <h1 className="text-xl font-semibold">Articles</h1>
            <div className="p-4 grid grid-cols-3 gap-4">
                {listArticles()}
            </div>
        </div>
    );
}