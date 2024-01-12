const express = require('express');
const router = express.Router();
const { RegisterUser, authUser } = require('../controller/authController');
router.post('/register', RegisterUser);

router.post('/login', authUser);

module.exports = router;
