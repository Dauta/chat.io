var chat = function(socket, messages){

  socket.on('message', function(msg){
    //push it to the messages array
    messages.push({sender: socket.id, message: msg});
    //send it back to the sender
    socket.emit('my_message', msg);
    //send it to everyone else
    socket.broadcast.emit('new_message', msg);
  });
};
module.exports = chat;
