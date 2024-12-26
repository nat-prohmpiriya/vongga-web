"use client";

import { Post } from "@/types/post";
import ViewMedia, { ViewMediaRef } from './ViewMedia'
import { useRef } from "react";

interface DynamicPostImageProps {
    post: Post
}

const DynamicPostImage = ({ post }: DynamicPostImageProps) => {
    const countSubPost = post?.subPosts?.length || 0
    const viewMediaRef = useRef<ViewMediaRef>(null)

    if (countSubPost === 0 && !post?.media?.[0]?.url) return null

    if (post?.media?.[0]?.url && countSubPost === 0) {
        return (
            <div className="cursor-pointer">
                <img
                    src={post.media[0].url}
                    alt="Post"
                    className="w-full object-cover"
                />
                <ViewMedia ref={viewMediaRef} post={post} />
            </div>
        )
    }

    if (post?.media?.[0]?.url && countSubPost === 1) {
        return (
            <div className="grid grid-cols-2 h-96">
                <div className="cursor-pointer ">
                    <img
                        src={post.media[0].url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
                <div className="cursor-pointer">
                    <img
                        src={post?.subPosts?.[0]?.media?.[0]?.url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
                <ViewMedia ref={viewMediaRef} post={post} />
            </div>
        )
    }

    if (post?.media?.[0]?.url && countSubPost === 2) {
        return (
            <div className="cursor-pointer h-96 grid grid-rows-2">
                <div className="row-span-1">
                    <img
                        src={post.media[0].url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
                <div className="row-span-1">
                    <img
                        src={post?.subPosts?.[0]?.media?.[0]?.url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                    <img
                        src={post?.subPosts?.[1]?.media?.[0]?.url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
                <ViewMedia ref={viewMediaRef} post={post} />
            </div>
        )
    }

    if (post?.media?.[0]?.url && countSubPost === 3) { // 4imageas
        return (
            <div className="mb-3 cursor-pointer h-96 grid grid-rows-2">
                <div className="row-span-1">
                    <img
                        src={post.media[0].url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
                <img
                    src={post?.subPosts?.[0]?.media?.[0]?.url}
                    alt="Post"
                    className="w-full object-cover"
                />
                <div className="row-span-1">
                    <img
                        src={post?.subPosts?.[1]?.media?.[0]?.url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
                <div className="row-span-1">
                    <img
                        src={post?.subPosts?.[2]?.media?.[0]?.url}
                        alt="Post"
                        className="w-full object-cover"
                    />
                </div>
                <ViewMedia ref={viewMediaRef} post={post} />
            </div>
        )
    }

    if (post?.media?.[0]?.url && countSubPost > 3) {
        return (
            <div className="bg-black">
                <div className="flex">
                    <div className="w-1/2 cursor-pointer" onClick={() => viewMediaRef?.current?.open(0)}>
                        <img src={post.media[0].url} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/2 cursor-pointer" onClick={() => viewMediaRef?.current?.open(1)}>
                        <img src={post?.subPosts?.[0]?.media?.[0]?.url} className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 cursor-pointer" onClick={() => viewMediaRef?.current?.open(2)}>
                        <img src={post?.subPosts?.[1]?.media?.[0]?.url} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/2 cursor-pointer" onClick={() => viewMediaRef?.current?.open(3)}>
                        <img src={post?.subPosts?.[2]?.media?.[0]?.url} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-1/2 relative opacity-70  cursor-pointer" onClick={() => viewMediaRef?.current?.open(4)}>
                        <img src={post?.subPosts?.[3]?.media?.[0]?.url} alt="Post" className="w-full h-full object-cover" />
                        <div className="text-black text-5xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">+{countSubPost - 4}</div>
                    </div>
                </div>
                <ViewMedia ref={viewMediaRef} post={post} />
            </div>

            // <div className="mb-3 cursor-pointer h-[600px] grid grid-rows-2">
            //     <div className="row-span-1 flex bg-black ">
            //         <img
            //             src={post.media[0].url}
            //             alt="Post"
            //             className=" w-full object-cover "
            //         />
            //         <img
            //             src={post?.subPosts?.[0]?.media?.[0]?.url}
            //             alt="Post"
            //             className=" w-full object-cover "
            //         />
            //     </div>
            //     <div className="row-span-1 flex  bg-black">
            //         <img
            //             src={post?.subPosts?.[1]?.media?.[0]?.url}
            //             alt="Post"
            //             className=" object-cover h-full "
            //         />
            //         <img
            //             src={post?.subPosts?.[2]?.media?.[0]?.url}
            //             alt="Post"
            //             className="w-[225px] object-cover h-full "
            //         />
            //         <img
            //             src={post?.subPosts?.[3]?.media?.[0]?.url}
            //             alt="Post"
            //             className="w-[225px] object-cover h-full "
            //         />
            //         {/* <img
            //             src={post?.subPosts?.[2]?.media?.[0]?.url}
            //             alt="Post"
            //             className="w-full object-cover h-[200px] "
            //         />
            //         {countSubPost > 4 && (
            //             <div className="">
            //                 <span className="text-white text-2xl font-bold">+{countSubPost - 3}</span>
            //             </div>
            //         )} */}
            //     </div>
            // </div>
        )
    }
}

export default DynamicPostImage