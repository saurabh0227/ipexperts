const express = require('express');
require('dotenv').config();
const { verify } = require('./api/users/jwt');
const user = require('./api/users');
const userRoutes = require('./api/users/route')
const profileRoutes = require('./api/profile/route');
const { app } = require("./express")

const router = express.Router();

app.use(user);
app.use(verify);
app.use(userRoutes);
app.use(profileRoutes);

module.exports = router;