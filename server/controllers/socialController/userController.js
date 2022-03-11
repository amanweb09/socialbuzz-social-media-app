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
        }
    }
}