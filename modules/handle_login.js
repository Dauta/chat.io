var login = function(socket, users){

    //initialize list of already active users to a new user
    socket.emit('initialize', users);
    //catch new login
    socket.on('login', function(data){
      var user = data;
      user.id = socket.id;
      console.log(user.username + " just logged in, from " + user.location);
      users.push(user);
      //send list of all active users excluding self
      socket.broadcast.emit('new_login', user);
  });
};

module.exports = login;
