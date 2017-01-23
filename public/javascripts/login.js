console.log(window.location.origin);
var socket = io(window.location.origin);

socket.on('ping_from_server', function(data){
  console.log(data);
});

socket.on('initialize', function(users){
  var userlist = document.getElementById("user_list");

  users.forEach((user)=>{
    var userdata = document.createElement("div");
    userdata.className = "user_card";
    var name = document.createElement("h1");
    name.innerHTML = user.username;
    var desc = document.createElement("h2");
    desc.innerHTML = user.age + ", " + user.location;
    userdata.appendChild(name);
    userdata.appendChild(desc);

    userlist.appendChild(userdata);
  });
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

var receive_user_info = function(){

  var userlist = document.getElementById("user_list");

  socket.on('new_login', function(user){
    //console.log(users);
        var userdata = document.createElement("div");
        userdata.className = "user_card";
        var name = document.createElement("h1");
        name.innerHTML = user.username;
        var desc = document.createElement("h2");
        desc.innerHTML = user.age + ", " + user.location;
        userdata.appendChild(name);
        userdata.appendChild(desc);

        userlist.appendChild(userdata);
  });
};

send_user_info();
receive_user_info();
