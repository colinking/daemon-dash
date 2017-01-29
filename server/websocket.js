let dataStream = [];

module.exports = (socket) => {
  socket.emit('connected', { hello: 'world' });
  socket.emit("PROFESSOR_CODE_EDITED", dataStream[dataStream.length - 1] || {text: "\/\/no code"});
  socket.on("PROFESSOR_CODE_EDITED", (d) => {
    dataStream.push(d);
    socket.broadcast.emit("PROFESSOR_CODE_EDITED", d);
  });
};
