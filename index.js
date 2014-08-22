var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 57888});

var Peer = require('peer.min.js');

var express = require('express');
var app = express();
var http = require('http').createServer(app);
//var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
// player names which are currently connected to the game
//var playerNames = {};
//var numPlayers = 0;
//
app.get('/', function(req, res){
    res.sendFile('index.html');
});

server.on('connection', function(id) {
    console.log('user ' + id + ' connected');
});

var game_server = new Peer('server', {host: 'localhost', port: 57888});
//
//io.on('connection', function(socket){
//    console.log('a user connected');
//
//    socket.on('disconnect', function(){
//        console.log('user disconnected');
//        numPlayers--;
//    });
//    socket.on('add player', function () {
//
//        numPlayers++;
//        socket.clientNum = numPlayers;
//
//        socket.emit('login', {
//            numPlayers: numPlayers
//        });
//
//        console.log('player number - ' + numPlayers);
//
//        socket.broadcast.emit('player joined', {
//            playerNum: socket.clientNum,
//            numPlayers: numPlayers
//        });
//    });
//
//    socket.on('entity moved', function(data) {
//        console.log(data);
//        socket.broadcast.emit('entity moved', data);
//    });
//});
//
http.listen(3000, function(){
    console.log('listening on *:3000');
});