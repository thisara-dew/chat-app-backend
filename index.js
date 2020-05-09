// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
const required = require("esm")(module/* , options */)
const app = required("./main.js")
const socketIo = require('socket.io');
const port = normalizePort(process.env.PORT || '3000');

const server = app.listen(port, () => {
    const { name: appName, version: appVersion } = require('./package.json');
    console.log({ appName, appVersion, port }); 
});


function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

const io = socketIo(server);

io.on('connection', socket => {
    console.log(`${io.engine.clientsCount} connections`);

    socket.on('chat', message => {
        io.sockets.emit('chat-message', message , socket.id);
        console.log('>',message);
        
    });

    socket.on('disconnect', () => {
        console.log(`disconnect: ${socket.id}`);
        
    });
});

console.log('socket running');


