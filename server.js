//Created by Irakli Dautashvili
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


app.set('views', __dirname+'/public/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
//middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
//route calls
app.use('/', require('./routes/index.js'));

//list of active users
var users = [];
//list of messages
var messages = [];

var socket_listener = require(path.resolve('./modules/socket_listener.js'))(io, users, messages);
server.listen(port);
console.log("server running on port " + port + "...");
