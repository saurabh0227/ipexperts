const express = require('express');
const { postLogin, getAllUser, createUser } = require('./controller');
const router = express.Router();

//Routes
router.post('/auth', postLogin);
router.post('/auth/createuser', createUser);
router.get('/all-users', getAllUser)


module.exports = router;