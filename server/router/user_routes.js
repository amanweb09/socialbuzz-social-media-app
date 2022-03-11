const router = require('express').Router()

const commentController = require('../controllers/postControl/commentController');
const likesController = require('../controllers/postControl/likesController');
const postsController = require('../controllers/postControl/postsController');
const userController = require('../controllers/socialController/userController');
const profileController = require('../controllers/userControl/profileController');

const authenticate = require('../middleware/authenticate')

router.post('/api/posts/create', authenticate, postsController().create)
router.get('/api/posts/show-on-feed', authenticate, postsController().showOnFeed)

router.get('/api/comments/all', authenticate, commentController().showAllComments)
router.get('/api/likes/all', authenticate, likesController().showAllLikes)
router.post('/api/like', authenticate, likesController().likePost)

router.get('/api/get-profile', authenticate, profileController().getProfile)
router.get('/api/my-account', authenticate, profileController().getAccountDetails)

router.get('/api/users/:username', authenticate, userController().getUser)

router.post('/api/follow-request', authenticate, userController().followRequest)
router.post('/api/unfollow', authenticate, userController().unfollow)


module.exports = router;