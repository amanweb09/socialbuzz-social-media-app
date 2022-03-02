const postService = require('../../services/postService')

module.exports = function commentController() {
    return {
        async postComment(req, res) {
            const eventEmitter = req.app.get('eventEmitter')

            eventEmitter.on('post_commented', async ({ userId, postId, comment }) => {
                const posts = await postService.findPosts({ _id: postId })

                if (posts) {
                    posts[0].comments.unshift({
                        userId, comment,
                        postedOn: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
                    })

                    try {
                        await posts.save()
                        return res
                            .status(200)
                            .json({ message: "comment added" })
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
        async showAllComments(req, res) {
            const { postId } = req.query;

            const posts = await postService.findPosts({ _id: postId })

            if (posts[0]) {
                return res
                    .status(200)
                    .json({ comments: posts[0].comments })
            }

            return res
                .status(500)
                .json({ err: "Something went wrong!" })
        }
    }
}