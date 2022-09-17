const express = require('express');
const controller = require('../controller/userControllers');

//init user router
const userRouter = express.Router();

userRouter.post('/signup', controller.signup);
userRouter.post('/login', controller.login);

module.exports = userRouter;