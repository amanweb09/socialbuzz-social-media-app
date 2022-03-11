const postService = require('../../services/postService')

module.exports = function commentController() {
    return {
        async postComment(req, res) {

            const { postId, comment } = req.body;

            if (!postId || !comment) {
                return res
                    .status(422)
                    .json({ err: "All fields are required" })
            }

            const post = await postService.findPost({ _id: postId })

            if (post) {
                post.comments.unshift({
                    userId: req._id,
                    comment,
                    postedOn: `${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`
                })

                try {
                    await post.save()
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