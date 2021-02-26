const express = require('express');
const socketIo = require('socket.io')();
const cors = require('cors');
const indexRouter = require('./web/routes/index');
const Controller = require('./web/controllers/index');

const app = express();
const server = require('http').Server(app);

const port = process.env.PORT || '8000';
app.set('port', port);

server.listen(port);
server.on('listening', onListening);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

let io = socketIo.listen(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ["GET", "POST"],
  }
});

io.on('connection', Controller.openChatMessage);

app.use('/', indexRouter);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
