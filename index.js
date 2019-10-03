require('dotenv').config();

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

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`\n* Server Running on http://localhost:${port} *\n`);
});