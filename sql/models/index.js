const getMessages = (db, callback) => {
  db.query(`SELECT * FROM messages ORDER BY id DESC LIMIT 10`, (err, res) => {
    if (err) return console.error(err);
    return callback(res);
  });
};

const createMessage = ({ db, params, callback }) => {
  const { text, username } = params;

  db.query(`INSERT INTO messages (text, username) VALUES ($1, $2) 
  RETURNING text, username, created_at`, 
  [text, username],
  (err, res) => {
    if (err) return console.error(err);
    return callback(res);
  });
};

const getSocketMessages = (db) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM messages ORDER BY id DESC 
    LIMIT 10`, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const createSocketMessage = ({ db, params }) => {
  const { text, username } = params;

  return new Promise((resolve, reject) => {
    db.query(`INSERT INTO messages (text, username) VALUES ($1, $2)
    RETURNING text, username, created_at`,
    [text, username],
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

module.exports = {
  getMessages,
  createMessage,
  getSocketMessages,
  createSocketMessage,
};
