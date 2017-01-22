//Created by Irakli Dautashvili on November 3, 2016
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 3000;

app.set('views', __dirname+'/public/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
//route calls
app.use('/', require('./routes/index.js'));

server.listen(port);
console.log("server running on port " + port + "...");

// //socket
// var io = require('socket.io')(server);
//
// var active_users = [];
// var user_index = 0;
//
// //open the connection with the client
// io.on('connection', function (socket) {
//     console.log('connection open to the client');
//     socket.emit('ping_from_server', 'Hello from the server');
//
//     //catch new login
//     socket.on('login', function (data) {
//         var user = data;
//         console.log(user.username + " just logged in, from " + user.location);
//         socket.emit('myIndex', user_index);
//         active_users.push(user);
//         user_index++;
//
//         console.log(active_users);
//         //TODO emit broadcast the user object
//
//     });
//
//     //dissconnect
//     socket.on('disconnect', function () {
//         console.log('One client disconnected');
//     });
// });
