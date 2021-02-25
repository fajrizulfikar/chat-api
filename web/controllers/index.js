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

const openChatMessage = (io) => {
  console.log('a user connected');

  io.on('chat message', (msg) => {
    Model.createSocketMessage({
      db,
      params: JSON.parse(msg)
    })
      .then(() => emitMostRecentMessages(io))
      .catch((err) => io.emit(err));
  });

  io.on('disconnect', () => {
    console.log('socket.io connection terminated');
  });
};

const emitMostRecentMessages = (io) => {
  Model.getSocketMessages(db)
    .then((res) => io.emit('chat message', res))
    .catch((err) => console.error(err));
};

module.exports = {
  getMessages,
  createMessage,
  openChatMessage,
};
