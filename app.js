const express = require('express');
const indexRouter = require('./web/routes/index');
const cors = require('cors');
const socketIo = require('socket.io')();

module.exports = (app, server) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());

  let io = socketIo.listen(server, {
    cors: {
      origin: 'http://localhost:3001',
      methods: ["GET", "POST"],
    },
  });

  app.io = io;
  app.use(function(req, res, next) { 
    'use strict';
    req.io = io;
    next();
  });

  io.on('connection', (socket) => {
    console.log('socket.io connection made');
  });

  app.use('/', indexRouter);
};
