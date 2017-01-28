module.exports = (socket) => {
  socket.emit('connected', { hello: 'world' });

  socket.on("PROFESSOR_CODE_EDITED", (d) => {
    socket.broadcast.emit("PROFESSOR_CODE_EDITED", d);
  });
};
