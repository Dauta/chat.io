/*jshint esversion: 6 */
console.log(window.location.origin);
var socket = io(window.location.origin);

//create list of already online users
socket.on('initialize', function(users){
  var userlist = document.getElementById("user_list");

  users.forEach((user)=>{
    var userdata = document.createElement("div");
    userdata.className = "user_card";
    userdata.setAttribute("id", user.id);
    userdata.setAttribute("title", user.id);
    var name = document.createElement("h1");
    name.innerHTML = user.username;
    var desc = document.createElement("h2");
    desc.innerHTML = user.age + ", " + user.location;
    userdata.appendChild(name);
    userdata.appendChild(desc);

    userlist.appendChild(userdata);
  });
});

//send my info to the server
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

//receive info of occuring user traffic
var receive_user_info = function(){

  var userlist = document.getElementById("user_list");
  //handle new logins
  socket.on('new_login', function(user){
    //console.log(users);
        var userdata = document.createElement("div");
        userdata.setAttribute("id", user.id);
        userdata.setAttribute("title", user.id);
        userdata.className = "user_card";
        var name = document.createElement("h1");
        name.innerHTML = user.username;
        var desc = document.createElement("h2");
        desc.innerHTML = user.age + ", " + user.location;
        userdata.appendChild(name);
        userdata.appendChild(desc);

        userlist.appendChild(userdata);
  });
  //handle dosconnected users
  //remove the user cards of disconnected users
  socket.on('disconnected', function(id){
    var disconnected = document.getElementById(id).outerHTML = "";
    delete disconnected;
  });
};

send_user_info();
receive_user_info();
