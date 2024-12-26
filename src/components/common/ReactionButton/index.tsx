

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
    const [totalReaction, setTotalReaction] = useState(0);
    const [currentReaction, setCurrentReaction] = useState<ReactionType | ''>('');

    const handlerReactionSubmit = async (type: ReactionType) => {
        if (!postId && !commentId) return;
        const resutl = await reactionService.createReaction({ postId, commentId, type });
        setReactionId(resutl.id);
        if (!postId && !commentId) return;
        if (postId) fetchReactionsPost();
        if (commentId) fetchReactionsComment();
    }

    const removeReaction = async () => {
        if (!postId && !commentId || !reactionId) return;
        const resutl = await reactionService.deleteReaction(reactionId);
        setReactionId('');
        if (postId) fetchReactionsPost();
        if (commentId) fetchReactionsComment();
    }

    const fetchReactionsPost = async () => {
        if (!postId) return;
        const result = await reactionService.getReactionsPost(postId);
        const reactionTotal = result ? result.length : 0;
        setTotalReaction(reactionTotal);
    }

    const fetchReactionsComment = async () => {
        if (!commentId) return;
        const result = await reactionService.getReactionsComment(commentId);
        const reactionTotal = result ? result.length : 0;
        setTotalReaction(reactionTotal);
    }

    const handlerReaction = async (reaction: string) => {
        const reactionType = reaction.toLowerCase() as ReactionType;
        const isSameCurrentReaction = reactionType === currentReaction;
        if (isSameCurrentReaction) {
            setCurrentReaction('');
        } else {
            // const resutl = await reactionService.deleteReaction(reactionId); // ? error next fix bug if clicke many reaction and dupicate is double reaction
            setCurrentReaction(reactionType);
        }
    }

    useEffect(() => {
        if (!postId && !commentId) return;
        if (postId) fetchReactionsPost();
        if (commentId) fetchReactionsComment();
    }, [postId, commentId])

    useEffect(() => {
        if (currentReaction) {
            handlerReactionSubmit(currentReaction);
        } else {
            removeReaction();
        }
    }, [currentReaction])


    const className = `hover:scale-150 transition-transform text-2xl cursor-pointer `
    const reactions = [
        { icon: <FaThumbsUp className={className + `${currentReaction === 'like' ? 'text-blue-500' : 'text-gray-500'}`} />, label: 'Like' },
        { icon: <BsFillEmojiHeartEyesFill className={className + `${currentReaction === 'care' ? 'text-blue-500' : 'text-gray-500'}`} />, label: 'Care' },
        { icon: <FaHeart className={className + `${currentReaction === 'love' ? 'text-blue-500' : 'text-gray-500'}`} />, label: 'Love' },
        { icon: <FaLaughSquint className={className + `${currentReaction === 'haha' ? 'text-blue-500' : 'text-gray-500'}`} />, label: 'Haha' },
        { icon: <FaSurprise className={className + `${currentReaction === 'wow' ? 'text-blue-500' : 'text-gray-500'}`} />, label: 'Wow' },
        { icon: <FaSadTear className={className + `${currentReaction === 'sad' ? 'text-blue-500' : 'text-gray-500'}`} />, label: 'Sad' },
        { icon: <FaAngry className={className + `${currentReaction === 'angry' ? 'text-blue-500' : 'text-gray-500'}`} />, label: 'Angry' },
    ]

    const content = (
        <div className="flex">
            {
                reactions.map((reaction, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center gap-2 py-2 px-4 cursor-pointer"
                        onClick={() => { handlerReaction(reaction.label) }}
                    >
                        <span >{reaction.icon}</span> <span className="text-xs">{reaction.label}</span>
                    </div>
                ))
            }
        </div>
    )
    return (
        <Popover trigger="hover" content={content}>
            <div className={`flex items-center gap-2 cursor-pointer ${currentReaction === 'like' ? 'text-blue-500' : 'text-gray-500'} ${currentReaction === 'like' ? 'hover:text-blue-600' : 'hover:text-gray-600'}`} onClick={() => handlerReaction('Like')} >
                {postId && <AiFillLike className="text-xl hover:scale-125" />} <span className="text-sm">Like {totalReaction}</span>
            </div>
        </Popover>
    )

}

export default ReactionButton