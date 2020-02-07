const express = require('express')
const { addProfile, getAllProfile } = require('./controller');
const router = express.Router();

router.get('/all-profiles', getAllProfile);

router.post('/add-profile', addProfile);

module.exports = router