console.log(window.location.origin);
var socket = io(window.location.origin);

socket.on('ping_from_server', function(data){
  console.log(data);
});

var send_user_info = function(){

  var username = document.getElementById("username").innerHTML;
  var userAge = document.getElementById("age").innerHTML;
  var userLoc = document.getElementById("location").innerHTML;
  //receive user info
  var user = {
    username: username,
    age: userAge,
    location: userLoc
  };

  socket.emit('login', user);
};

send_user_info();
