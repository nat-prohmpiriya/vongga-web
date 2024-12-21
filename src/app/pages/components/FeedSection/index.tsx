import CreateContentBar from "@/app/feed/components/CreateContentBar";
import Posts from "@/app/feed/components/Posts";

export default function FeedSection() {
    return (
        <div>
            <CreateContentBar />
            <div className="mt-4">
                <h2 className="text-lg font-semibold">Latest Updates</h2>
            </div>
            <Posts />
        </div>
    );
}