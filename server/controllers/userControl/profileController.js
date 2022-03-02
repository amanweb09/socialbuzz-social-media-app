module.exports = function profileController() {
    return {
        getProfile(req, res) {
            return res
            .status(200)
            .json({
                _id: req._id,
                name: req.name,
                email: req.email, 
                username: req.username,
                tel:req.tel,
                role: req.role,
                followers: req.followers,
                following: req.follwoing
            })
        }
    }
}