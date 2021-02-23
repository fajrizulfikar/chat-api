const Model = require('../../sql/models/index');
const db = require('../../sql/server');

const getMessages = (req, res) => {
  Model.getMessages(db, data => {
    try {
      if (data) res.status(200).json(data.rows);
    } catch (error) {
      res.status(500);
    }
  });
};

const createMessage = (req, res) => {
  Model.createMessage({ db, params: req.body, callback: data => {
    try {
      if (data) res.status(201).send(data.rows);
    } catch (error) {
      res.status(400);
    }
  }});
};

module.exports = {
  getMessages,
  createMessage,
};
