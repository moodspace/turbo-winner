var express = require('express');
var path = require('path');

var app = express();

// remove the following on production server
app.use("/res", express.static(__dirname + '/res'));
app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/data", express.static(__dirname + '/data'));
// app.use("/downloads", express.static(__dirname + '/downloads'));

app.get('/*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/index.html'), {}, function(err) {});
});

app.listen(27942);
