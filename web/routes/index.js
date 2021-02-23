const express = require('express');
const Controller = require('../controllers/index');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Hello world!' });
});

router.get('/messages', Controller.getMessages);

router.post('/messages', Controller.createMessage);

module.exports = router;
