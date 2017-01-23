// var express = require('express');
// var http = require('http');
// var app = express();
// var server = http.createServer(app);

var login = function(server, users){
//socket
var io = require('socket.io')(server);
var user_index = 0;

//open the connection with the client
io.on('connection', function(socket){
  console.log('connection open to the client');
  socket.emit('ping_from_server', 'Hello from the server');

  //initialize list of already active users to a new user
  socket.emit('initialize', users);

  //catch new login
  socket.on('login', function(data){
  var user = data;
  console.log(user.username + " just logged in, from " + user.location);
  users.push(user);
  user_index++;

  console.log(users);
  //send list of all active users excluding self
  socket.broadcast.emit('new_login', user);
});

  //dissconnect
  socket.on('disconnect', function(){
    console.log('One client disconnected');
  });
});
};

module.exports = login;
