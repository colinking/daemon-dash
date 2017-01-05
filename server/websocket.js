module.exports = (socket) => {
  socket.emit('connected', { hello: 'world' });
};
