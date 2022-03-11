import React, { useEffect, useState } from 'react'
import AccountPost from '../components/posts/AccountPost'
import { useSelector } from 'react-redux'
import { logout, myProfile } from '../api'

const Profile = () => {

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAccountDetails() {
            try {
                const { data } = await myProfile()
                setUser(data.user)
                setPosts(data.posts)
                setLoading(false)

            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        getAccountDetails()
    }, [])

    async function logoutUser() {
        try {
            await logout()

            const winLocation = 'http://localhost:3000' || `${process.env.CLIENT_ADDRESS}/profile`
            window.location.href = winLocation

        } catch (error) {
            console.log(error);
            alert("Couldn't logout ...Please try again")
        }
    }

    if (loading) return <div className='w-screen h-screen flex-center font-bold'>Loading...</div>

    return (
        <div className='container mx-auto'>
            <header className='flex items-center justify-between w-full'>
                <h2 className="font-bold text-lg">{user.username}</h2>
            </header>

            <div className='flex-center mx-auto mt-4'>
                <div className='w-20 h-20 rounded-full bg-gray-200'></div>
                <div className='flex-center px-4'>
                    <div className='flex-center flex-col'>
                        <h2 className='font-bold'>{posts.length ? posts.length : 0}</h2>
                        <h6 className='font-semibold'>Posts</h6>
                    </div>
                    <div className='flex-center flex-col mx-6'>
                        <h2 className='font-bold'>{user.followers.length ? user.followers.length : 0}</h2>
                        <h6 className='font-semibold'>Followers</h6>
                    </div>
                    <div className='flex-center flex-col'>
                        <h2 className='font-bold'>{user.following.length ? user.following.length : 0}</h2>
                        <h6 className='font-semibold'>Following</h6>
                    </div>
                </div>
            </div>

            <div className="block mx-auto w-max my-4">
                <button
                    onClick={logoutUser}
                    className='w-48 h-10 bg-red-500 hover:bg-red-600 font-bold text-white'>
                    Logout
                </button>
            </div>

            <div className='grid grid-cols-4 mb-4 mt-10'>
                {
                    posts.length && posts.map((post) => {
                        return <AccountPost
                            key={post._id}
                            picture={post.picture} />
                    })
                }

            </div>
        </div>
    )
}

export default Profile