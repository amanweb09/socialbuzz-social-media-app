const postService = require('../../services/postService')

module.exports = function likesController() {
    return {
        async likePost(req, res) {
            const eventEmitter = req.app.get('eventEmitter')

            eventEmitter.on('post_liked', async ({ userId, postId }) => {
                const posts = await postService.findPosts({ _id: postId })

                if (posts) {
                    posts[0].likedBy.unshift(userId)
                    try {
                        await posts.save()
                        return res
                            .status(200)
                            .json({ message: "like added" })
                    } catch (error) {
                        console.log(error);
                        return res
                            .status(500)
                            .json({ err: "Something went wrong!" })
                    }
                }

                return res
                    .status(404)
                    .json({ err: "No post found with this ID!" })
            })
        },
        async showAllLikes(req, res) {
            const { postId } = req.query;

            const posts = await postService.findPosts({ _id: postId })

            if (posts[0]) {
                return res
                    .status(200)
                    .json({ likes: posts[0].likedBy })
            }

            return res
                .status(500)
                .json({ err: "Something went wrong!" })
        }
    }
}