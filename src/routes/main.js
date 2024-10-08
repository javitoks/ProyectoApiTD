const { Router } = require('express');
const usersRouter = require('./userRoutes');
const postsRouter = require('./postRoutes');
const authRoutes = require('./authRoutes');
const mainRouter = Router();

//Auth
mainRouter.use('/auth', authRoutes);

// Users
 
mainRouter.use('/users',usersRouter);

// Posts

mainRouter.use('/posts',postsRouter);



module.exports = mainRouter;
