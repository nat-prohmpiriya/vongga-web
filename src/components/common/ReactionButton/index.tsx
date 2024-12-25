

import { AiFillLike } from 'react-icons/ai'
import { Popover, Tooltip } from 'antd'
import {
    FaThumbsUp, // Like
    FaHeart, // Love
    FaLaughSquint, // Haha
    FaSurprise, // Wow
    FaSadTear, // Sad
    FaAngry // Angry
} from "react-icons/fa";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs"; // ตัวอย่าง icon ที่คล้าย care
import reactionService from '@/services/reaction.service'
import { ReactionType } from '@/types/reaction'
import { useState, useEffect } from 'react'

interface ReactionButtonProps {
    postId?: string;
    commentId?: string;
}

const ReactionButton = ({ postId, commentId }: ReactionButtonProps) => {
    const [reactionId, setReactionId] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [totalReaction, setTotalReaction] = useState(0);

    const handlerReactionSubmit = async (type: string) => {
        if (!postId && !commentId) return;
        const reaction: ReactionType = type.toLowerCase() as ReactionType;
        const resutl = await reactionService.createReaction({ postId, commentId, type: reaction });
        setReactionId(resutl.id);
        setIsClicked(true);
        if (!postId && !commentId) return;
        if (postId) fetchReactionsPost();
        if (commentId) fetchReactionsComment();
        console.log(resutl);
    }

    const addReactionLike = async () => {
        if (!postId && !commentId) return;
        const reaction: ReactionType = 'like';
        const resutl = await reactionService.createReaction({ postId, commentId, type: reaction });
        setReactionId(resutl.id);
        console.log(resutl);
        if (!postId && !commentId) return;
        if (postId) fetchReactionsPost();
        if (commentId) fetchReactionsComment();
    }

    const removeReactionLike = async () => {
        if (!postId && !commentId || !reactionId) return;
        const resutl = await reactionService.deleteReaction(reactionId);
        console.log(resutl);
        if (!postId && !commentId) return;
        if (postId) fetchReactionsPost();
        if (commentId) fetchReactionsComment();
        setIsClicked(false);
    }

    useEffect(() => {
        if (isClicked) {
            addReactionLike();
        } else {
            removeReactionLike();
        }
    }, [isClicked])

    const fetchReactionsPost = async () => {
        if (!postId) return;
        const result = await reactionService.getReactionsPost(postId);
        console.log('fetchReactionsPost', result);
        const reactionTotal = result ? result.length : 0;
        setTotalReaction(reactionTotal);
    }

    const fetchReactionsComment = async () => {
        if (!commentId) return;
        const result = await reactionService.getReactionsComment(commentId);
        console.log('fetchReactionsComment', result);
        const reactionTotal = result ? result.length : 0;
        setTotalReaction(reactionTotal);
    }

    useEffect(() => {
        if (!postId && !commentId) return;
        if (postId) fetchReactionsPost();
        if (commentId) fetchReactionsComment();
    }, [postId, commentId])


    const className = "text-blue-500 hover:scale-150 transition-transform text-2xl"
    const reactions = [
        { icon: <FaThumbsUp className={className} />, label: 'Like' },
        { icon: <BsFillEmojiHeartEyesFill className={className} />, label: 'Care' },
        { icon: <FaHeart className={className} />, label: 'Love' },
        { icon: <FaLaughSquint className={className} />, label: 'Haha' },
        { icon: <FaSurprise className={className} />, label: 'Wow' },
        { icon: <FaSadTear className={className} />, label: 'Sad' },
        { icon: <FaAngry className={className} />, label: 'Angry' },

    ]
    const content = (
        <div className="flex">
            {
                reactions.map((reaction, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 py-2 px-4 cursor-pointer" onClick={() => handlerReactionSubmit(reaction.label)}>
                        {reaction.icon} <span className="text-xs">{reaction.label}</span>
                    </div>
                ))
            }
        </div>
    )
    return (
        <Popover trigger="hover" content={content}>
            <div className={`flex items-center gap-2 cursor-pointer ${isClicked ? 'text-blue-500' : 'text-gray-500'} ${isClicked ? 'hover:text-blue-600' : 'hover:text-gray-600'}`} onClick={() => setIsClicked(!isClicked)} >
                {postId && <AiFillLike className="text-xl hover:scale-125" />} <span className="text-sm">Like {totalReaction}</span>
            </div>
        </Popover>
    )

}

export default ReactionButton