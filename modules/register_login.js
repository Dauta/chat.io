// var express = require('express');
// var http = require('http');
// var app = express();
// var server = http.createServer(app);

var login = function(server){
//socket
var io = require('socket.io')(server);
//list of active users
var users = [];
//open the connection with the client
io.on('connection', function(socket){
  console.log('connection open to the client');
  socket.emit('ping_id', socket.id);

  //initialize list of already active users to a new user
  socket.emit('initialize', users);

  //catch new login
  socket.on('login', function(data){
  var user = data;
  user.id = socket.id;
  console.log(user.username + " just logged in, from " + user.location);
  users.push(user);
  console.log(users);
  //send list of all active users excluding self
  socket.broadcast.emit('new_login', user);
});

  //dissconnect
  socket.on('disconnect', function(){
    console.log('client disconnected: '+socket.id);
    //delete the user from the list
    users.splice(users.indexOf(socket.id), 1);
    socket.broadcast.emit('disconnected', socket.id);
  });
});
};

module.exports = login;
