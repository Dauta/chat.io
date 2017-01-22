var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res){
  res.render('login.html');
});

router.get('/chat', function(req, res){
  res.send('Please log in');
});

router.post('/chat', function(req, res){

  var user = req.body;
  res.render('chat.html', user);
  //res.sendFile(path.resolve('./public/views/chat.html'));
});

module.exports = router;
