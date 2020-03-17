
require('module-alias/register')

const express = require('express');
const path = require('path');

const userRouter = require('@routes/http/users');
const roomRouter = require('@routes/http/room');
const messageRouter = require('@routes/http/message');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/rooms', roomRouter);
app.use('/messages', messageRouter);

module.exports = app;
