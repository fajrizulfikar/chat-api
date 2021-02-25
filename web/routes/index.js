const express = require('express');
const Controller = require('../controllers/index');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>Hello world!</>')
  // res.sendFile(__dirname + '/index.html');
});

router.get('/messages', Controller.getMessages);

router.post('/messages', Controller.createMessage);

module.exports = router;
