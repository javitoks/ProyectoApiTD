const { Router } = require('express');
const usersRouter = require('./userRoutes');
const postsRouter = require('./postRoutes');
const mainRouter = Router();

// Users

mainRouter.use('/users',usersRouter);

// Posts

mainRouter.use('/posts',postsRouter);



module.exports = mainRouter;
