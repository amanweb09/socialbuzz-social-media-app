import React, { useEffect, useState } from 'react'
import AccountPost from '../components/posts/AccountPost'
import { useParams } from 'react-router-dom'
import { accountDetails } from '../api'

const Account = () => {

    const { username } = useParams()
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await accountDetails(username)
                console.log(data);
                setProfile(data.user)
                setPosts(data.posts)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        })()
    }, [])

    {
        if (loading) return <div className="h-screen w-screen font-bold flex-center">Loading...</div>
    }
    return (
        <div className='container mx-auto'>
            <header className='flex items-center justify-between w-full'>
                <h2 className="font-bold text-lg">{profile.username}</h2>
            </header>

            <div className='flex-center mx-auto mt-4'>
                <div className='w-20 h-20 rounded-full bg-gray-200'></div>
                <div className='flex-center px-4'>
                    <div className='flex-center flex-col'>
                        <h2 className='font-bold'>{posts.length ? posts.length : 0}</h2>
                        <h6 className='font-semibold'>Posts</h6>
                    </div>
                    <div className='flex-center flex-col mx-6'>
                        <h2 className='font-bold'>{profile.followers.length ? profile.followers.length : 0}</h2>
                        <h6 className='font-semibold'>Followers</h6>
                    </div>
                    <div className='flex-center flex-col'>
                        <h2 className='font-bold'>{profile.following.length ? profile.following.length : 0}</h2>
                        <h6 className='font-semibold'>Following</h6>
                    </div>
                </div>

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

export default Account