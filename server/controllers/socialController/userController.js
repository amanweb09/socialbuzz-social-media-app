const userService = require("../../services/userService");
const postService = require("../../services/postService");

module.exports = function userController() {
    return {
        async getUser(req, res) {
            const { username } = req.params;

            const user = await userService.findUser({ username })

            if (!user) {
                return res
                    .status(404)
                    .json({ err: "No user found with this username!" })
            }

            const posts = await postService.findPosts({ postedBy: user._id })

            return res
                .status(200)
                .json({ user, posts })
        },
        async followRequest(req, res) {
            const { _id } = req.body

            const follower = await userService.findUser({ _id: req._id })
            const following = await userService.findUser({ _id })

            if (!following) {
                return res
                    .status(404)
                    .json({ err: "User not found!" })
            }

            follower.following.unshift(following._id)
            following.followers.unshift(follower._id)

            try {
                await follower.save()
                await following.save()

                return res
                    .status(200)
                    .json({ message: "follower added" })
            } catch (error) {
                return res
                    .status(500)
                    .json({ message: "Server Error!" })

            }


        }
    }
}