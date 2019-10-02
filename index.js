const express = require('express');
const server = require('./server.js');
const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');
const logger = require('./middleware/logger');

//middleware setup
server.use(express.json());
server.use(logger);

server.use('/api/posts', postsRouter)
server.use('/api/users', usersRouter)

server.listen(9998, () => {
  console.log('\n* Server Running on http://localhost:9998 *\n');
});