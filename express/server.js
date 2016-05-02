var express = require('express');
var serveIndex = require('serve-index');
var app = express();

// Serve URLs like /ftp/thing as public/ftp/thing
app.use('/', serveIndex('src/', {'icons': true}));
app.use(express.static('src/'));

app.listen(1339, function(){
    console.log('http://localhost:1339');
});