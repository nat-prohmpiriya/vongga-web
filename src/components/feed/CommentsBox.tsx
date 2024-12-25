
import BaseProp from '@/types/baseProp'
import { Comment } from '@/types/comment'
import { formatISOToTimeAgo } from '@/utils/converTime'

interface CommentBoxProps extends BaseProp {
    comment: Comment
}

const CommentBox = ({ comment }: CommentBoxProps) => (
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
                    <button className="hover:text-gray-900">
                        Like {0}
                    </button>
                    <button className="hover:text-gray-900">Reply</button>
                    {/* {replies && ( 
                        <button className="hover:text-gray-900">
                            View {replies} replies
                        </button>)} */}
                    <span>{formatISOToTimeAgo(comment?.createdAt)}</span>
                </div>
            </div>
        </div>
    </div>
)

export default CommentBox