//node socket-server.js
var socket = require('socket.io');
var express = require('express');
var app = express();
var io = socket.listen(app.listen(8080));
app.get('/', function(req, res){
res.sendfile(__dirname + '/index.html');
});
io.sockets.on('connection', function(client){
client.on('message', function(data){
//client.set('nickname', data);
client.emit('hello', {hello: 'Хай! ' + data});
client.broadcast.emit('hello', {hello: 'Хай від ' + data});
//io.sockets.emit('hello', {hello: 'Хай всім!'});
});
client.on('disconnect', function(){
io.sockets.emit('hello', {hello: 'Хтось з нас свалив'});
});
client.on('new_message', function(data){
client.emit('hello', {hello: 'Хай! ' + data});
//client.get('nickname', function(err, oldName){
//client.broadcast.emit('hello', {hello: oldName + 'тепер ' + data});
//io.sockets.emit('hello', {hello: 'Хай всім!'});
//});
//client.set('nickname', data);
});
});