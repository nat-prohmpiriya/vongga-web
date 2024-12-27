import BaseProp from '@/types/baseProp'
import { Comment } from '@/types/comment'
import { formatISOToTimeAgo } from '@/utils/converTime'
import ReactionButton from '../common/ReactionButton'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { VscSend } from "react-icons/vsc"
import commentService from '@/services/comment.service'

interface CommentBoxProps extends BaseProp {
    comment: Comment
    onReplyAdded?: () => void
    deleteComment: (id: string) => void
}

const CommentContent = ({ comment, onReplyAdded, deleteComment }: CommentBoxProps) => {
    const { user } = useAuthStore()
    const [showReplyInput, setShowReplyInput] = useState(false)
    const [replyContent, setReplyContent] = useState('')
    const [replies, setReplies] = useState<Comment[]>([])
    const [showReplies, setShowReplies] = useState(false)

    const handleReply = async () => {
        if (!replyContent) return
        const result = await commentService.createComment({
            content: replyContent,
            postId: comment.postId,
            parentId: comment.id
        })
        if (result) {
            setReplyContent('')
            setShowReplyInput(false)
            onReplyAdded?.()
        }
    }

    const loadReplies = async () => {
        const result = await commentService.getComments(comment.postId, comment.id)
        if (result) {
            setReplies(result)
            setShowReplies(true)
        }
    }

    return (
        <div className="py-3">
            <div className="flex gap-3">
                <img
                    src={comment?.user?.photoProfile}
                    alt={comment?.user?.username || ''}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                    <div className="bg-gray-100 rounded-2xl px-4 py-2.5">
                        <h4 className="font-semibold text-sm">{comment?.user?.username}</h4>
                        <p className="text-sm text-gray-600">{comment?.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <ReactionButton commentId={comment?.id} />
                        <button
                            className="hover:text-gray-900"
                            onClick={() => setShowReplyInput(!showReplyInput)}
                        >
                            Reply
                        </button>
                        {comment.repliesCount > 0 && (
                            <button
                                className="hover:text-gray-900"
                                onClick={showReplies ? () => setShowReplies(false) : loadReplies}
                            >
                                {showReplies ? 'Hide replies' : `View ${comment.repliesCount} replies`}
                            </button>
                        )}
                        <span>{formatISOToTimeAgo(comment?.createdAt)}</span>
                        {comment?.user?.userId === user?.id && (
                            <button
                                className="hover:text-gray-900"
                                onClick={() => deleteComment?.(comment?.id)}
                            >
                                Delete
                            </button>
                        )}
                    </div>

                    {showReplyInput && (
                        <div className="flex gap-3 mt-3">
                            <img
                                src={user?.photoProfile}
                                alt={user?.username || ''}
                                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex-1 flex">
                                <input
                                    type="text"
                                    placeholder="Write a reply..."
                                    className="w-full bg-gray-100 rounded-full py-1.5 px-4 pr-12 focus:outline-none text-sm"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                />
                                <button className="-ml-10" onClick={handleReply}>
                                    <VscSend className='hover:scale-125 text-lg text-gray-500 hover:text-gray-900' />
                                </button>
                            </div>
                        </div>
                    )}

                    {showReplies && replies.length > 0 && (
                        <div className="ml-8 mt-3 space-y-3">
                            {replies.map(reply => (
                                <CommentContent
                                    key={reply.id}
                                    comment={reply}
                                    onReplyAdded={loadReplies}
                                    deleteComment={deleteComment}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CommentContent