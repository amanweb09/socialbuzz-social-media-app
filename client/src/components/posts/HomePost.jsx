import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { addLike } from '../../api'
import AllComments from './AllComments'
import Comments from './Comments'

const HomePost = ({ postId, profilePicture, username, postImg, caption, likesCount, likedBy }) => {
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(likesCount)
    const [showComments, setShowComments] = useState(false)
    const [showAllComments, setShowAllComments] = useState(false)

    useEffect(() => {
        const isLikedByMe = likedBy.filter((liker) => {
            return liker === user._id
        })

        if (isLikedByMe.length) {
            setIsLiked(true)
            return
        }
    }, [])

    async function likeThePost() {
        try {
            await addLike({ postId })
            setIsLiked(true)
            setLikes(likes + 1)
            setIsLiked(true)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-2/3 mb-4">
            {
                showComments && <Comments postId={postId} setShowComments={setShowComments} />
            }
            {
                showAllComments && <AllComments postId={postId} setShowAllComments={setShowAllComments} username={username} />
            }
            <div className="flex items-center justify-start py-2">
                <div className="w-8 h-8 rounded-full bg-gray-200">
                    {
                        profilePicture && <img src={profilePicture} />
                    }
                </div>
                <span
                    onClick={() => navigate(`/account/${username}`)}
                    className="font-bold ml-2 cursor-pointer">{username}</span>
            </div>

            <div
                style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.45))' }}
                className='w-96 h-96'>
                <img
                    className='w-full h-full'
                    src={postImg}
                    alt="post" />
            </div>

            {
                caption && <div className="py-2">{caption}</div>
            }

            <div className="font-bold mt-2">
                Liked by {likes} people
            </div>

            <div className="flex items-center justify-start mt-2 pb-2">
                {
                    !isLiked ?
                        <img
                            onClick={likeThePost}
                            className="w-8 mr-4 cursor-pointer"
                            src="/images/like.png"
                            alt="like" />
                        :
                        <img
                            className="w-8 mr-4 cursor-pointer"
                            src="/images/heart.png"
                            alt="like" />
                }
                <img
                    onClick={() => !showComments ? setShowComments(true) : setShowComments(false)}
                    className="w-8 mr-4 cursor-pointer"
                    src="/images/comment.png"
                    alt="comment" />
                <img className="w-8 mr-4" src="/images/share.png" alt="share" />
            </div>

            <h2
                onClick={() => setShowAllComments(true)}
                className="text-gray-600 font-bold my-2 cursor-pointer"
            >Read all comments...</h2>
        </div>
    )
}

export default HomePost