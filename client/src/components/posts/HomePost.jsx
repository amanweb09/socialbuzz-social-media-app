import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import initSocket from '../../config/webSocket'

const HomePost = ({ postId, profilePicture, username, postImg, caption, likesCount }) => {
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()

    function likeThePost(details) {
        const socket = initSocket()

        socket.emit('like', details)
    }

    return (
        <div className="w-2/3 mb-4">
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
                style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}
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
                Liked by {likesCount} people
            </div>

            <div className="flex items-center justify-start mt-2 pb-2">
                <img
                    onClick={() => { likeThePost({ userId: user._id, postId }) }}
                    className="w-8 mr-4"
                    src="/images/like.png"
                    alt="like" />
                <img className="w-8 mr-4" src="/images/comment.png" alt="comment" />
                <img className="w-8 mr-4" src="/images/share.png" alt="share" />
            </div>

            <NavLink
                className="text-gray-600 font-bold my-2"
                to="/">Read all comments...</NavLink>
        </div>
    )
}

export default HomePost