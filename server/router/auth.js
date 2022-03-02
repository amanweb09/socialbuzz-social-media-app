const express = require('express');
const router = express.Router()

const signupController = require('../controllers/auth/signupController');
const loginController = require('../controllers/auth/loginController');

router.post('/api/signup', signupController().createUser)
router.post('/api/login', loginController().loginUser)


module.exports = router;