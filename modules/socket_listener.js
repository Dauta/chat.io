var path = require('path');
var login = require(path.resolve('./modules/handle_login.js'));
var chat = require(path.resolve('./modules/handle_chat.js'));

var socket_listener = function(io, users, messages){

  //open socket connection
  io.on('connection', function(socket){
    console.log('connection open to the client');
    socket.emit('ping_id', socket.id);
    //handle logins
    login(socket, users);
    //handle chat
    chat(socket, messages);
    //dissconnect
    socket.on('disconnect', function(){
      var dissconnect_id = socket.id;
      console.log('client disconnected: ' + dissconnect_id);
      //delete the user from the list
      users.forEach((user)=>{
        if(user.id == dissconnect_id){
          users.splice(users.indexOf(user),1);
        }
      });
      socket.broadcast.emit('disconnected', dissconnect_id);
    });
  });
};

module.exports = socket_listener;
