import { getEvn } from '@/helpers/getEnv'
import React, { useEffect, useState } from 'react'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import usericon from '@/assets/images/user.png'
import moment from 'moment'
import { useSelector } from 'react-redux'

const CommentList = ({ props }) => {
    const user = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshData, setRefreshData] = useState(false)

    const fetchComments = async () => {// fetches the comment id 
        setLoading(true)
        try {
            const res = await fetch(`${getEvn('VITE_API_BASE_URL')}/comment/get/${props.blogid}`, {
                method: 'GET',
                credentials: 'include',
            })
            const result = await res.json()
            if (res.ok) {
                setComments(result.comments)
            }
        } catch (error) {
            console.error("Error fetching comments:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchComments()
    }, [props.blogid, props.newComment, refreshData])

    const handleDelete = async (id) => { //api call to delete (deletes comment from backend using id)
        try {
            const res = await fetch(`${getEvn('VITE_API_BASE_URL')}/comment/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            if (res.ok) {
                setRefreshData(prev => !prev)
                alert('Comment deleted.')
            } else {
                alert('Failed to delete comment.')
            }
        } catch (err) {
            console.error("Error deleting comment:", err)
            alert("Error deleting comment.")
        }
    }

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h4 className='text-2xl font-bold'>
                <span className='me-2'>{comments.length}</span>
                Comments
            </h4>
            <div className='mt-5'>
                {comments.map(comment => (
                    <div key={comment._id} className='flex justify-between items-start gap-2 mb-3'>
                        <div className='flex gap-2'>
                            <Avatar>
                                <AvatarImage src={comment?.user.avatar || usericon} />
                            </Avatar>
                            <div>
                                <p className='font-bold'>{comment?.user.name}</p>
                                <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                                <div className='pt-3'>{comment?.comment}</div>
                            </div>
                        </div>
                        {user?.user?._id === comment?.user._id && ( // logged in user id == comment user id then display delete 
                            <button
                                onClick={() => handleDelete(comment._id)}
                                className='text-sm text-red-500 hover:underline'
                            >
                                Delete
                            </button>
                        )} 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentList