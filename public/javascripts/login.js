var socket = io(window.location.origin);
socket.on('ping_from_server', function(data){
  console.log(data);
});
var btnSubmit = document.getElementById("submit");
//receive user info
var user = {};

btnSubmit.addEventListener('click', function(e){
  e.preventDefault();
  var usrName = document.getElementById("username");
  var age = document.getElementById("age");
  var location = document.getElementById("location");

  user.username = usrName.value;
  user.age = age.value;
  user.location = location.value;

  socket.emit('login', user);

 document.getElementById("container").style.display = 'none';
 document.getElementById("message_container").style.display = 'block';
});
socket.on('myIndex', function(data){
  user.index = data;
  console.log(user.username+ user.age+ user.location+user.index);
});
