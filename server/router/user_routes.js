const router = require('express').Router()

const commentController = require('../controllers/postControl/commentController');
const likesController = require('../controllers/postControl/likesController');
const postsController = require('../controllers/postControl/postsController');
const profileController = require('../controllers/userControl/profileController');

const authenticate = require('../middleware/authenticate')

router.post('/api/posts/create', authenticate, postsController().create)
router.get('/api/posts/show-on-feed', authenticate, postsController().showOnFeed)

router.get('/api/comments/all', authenticate, commentController().showAllComments)
router.get('/api/likes/all', authenticate, likesController().showAllLikes)

router.get('/api/get-profile', authenticate, profileController().getProfile)

module.exports = router;