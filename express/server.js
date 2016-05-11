var express = require('express');
var serveIndex = require('serve-index');
var app = express();

// Serve URLs like /ftp/thing as public/ftp/thing
app.use('/', serveIndex('www/', {'icons': true}));
app.use(express.static('www/'));

app.listen(1339, function(){
    console.log('run http://localhost:1339');
});