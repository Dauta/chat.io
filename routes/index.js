var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/login.html'));
});

router.post('/chat', function(req, res){


  res.sendFile(path.resolve('./public/views/chat.html'));
});


module.exports = router;
