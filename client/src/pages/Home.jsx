import React, { useEffect, useState } from 'react'
import { showOnFeed } from '../api'
import HomePost from '../components/posts/HomePost'

const Home = () => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const { data } = await showOnFeed()
                setPosts(data.posts)

                console.log(data);

            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    return (
        <div className='container mx-auto'>
            {
                posts.map((post) => {
                    return (
                        <HomePost
                        key={post._id}
                            postId={post._id}
                            username={post.postedBy.username}
                            profilePicture={post.postedBy.profilePicture ? post.postedBy.profilePicture : null}
                            postImg={post.picture}
                            likesCount={post.likedBy.length}
                            caption={post.caption ? post.caption : null}
                        />
                    )
                })
            }
        </div>
    )
}

export default Home