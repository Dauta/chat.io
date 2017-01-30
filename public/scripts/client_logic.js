/*jshint esversion: 6 */
console.log(window.location.origin);
var socket = io(window.location.origin);

//handle logins
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
    var disconnected = document.getElementById(id);
    if(disconnected !== null && disconnected !== undefined){
      disconnected.outerHTML = "";
    }
  });
};

//handle chat
function formatTime(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = "0"+a.getHours();
  var min = "0"+a.getMinutes();
  var sec = "0"+a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour.substr(-2) + ':' + min.substr(-2) + ':' + sec.substr(-2);
  return time;
}

var send_message = function(){
  var messageBox = document.getElementById("message");
  var msg = messageBox.value;
  console.log(msg);
  //check for valid input
  if(msg !== "" && msg !== undefined && msg !== null){
    //get time of the message
    var time = Math.floor(Date.now() / 1000);
    //get text
    var text = msg;
    //get username
    var username = document.getElementById("username").innerHTML;
    //compose the message object
    var message = {
      time: time,
      userName: username,
      text: text
    };
    //send message to server
    socket.emit('message', message);
    //cleare message box
    messageBox.value = '';
  }
};

var createNewMessageCard = function(whose, msg){
  //get the message time
  var time = formatTime(msg.time);
  //get the converstaion box element
  var convo = document.getElementById("conversation");
  var message = document.createElement("div");
  message.className = whose;
  var name = document.createElement("p");
  name.innerHTML = time+": "+msg.userName+"-";
  var text = document.createElement("h1");
  text.innerHTML = msg.text;
  message.appendChild(name);
  message.appendChild(text);
  //display the message
  convo.appendChild(message);
};
//handle incoming messages
var receive_messages = function(){
  //receive a message sent by somebody
  socket.on('new_message',function(msg){
      //create a new message and render it
      console.log('your message');
      createNewMessageCard("your_message_body", msg);
  });

  socket.on('my_message', function(msg){
    //create and render my own message
    console.log('my message');
    createNewMessageCard("my_message_body", msg);
  });
};
//event listener for the button to send message
var btnMsg = document.getElementById("btnMsg");
btnMsg.addEventListener("click", send_message);
//start listening to incoming messages
receive_messages();
//send my info to the server
send_user_info();
//receive info of other user traffic
receive_user_info();
