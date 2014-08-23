var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 57888;
server.listen(port);

app.use(express.static(__dirname + '/public'));
// player names which are currently connected to the game
var playerNames = {};
var numPlayers = 0;

app.get('/', function(req, res){
    res.sendFile('index.html');
});

var dgram = require('dgram');
var game_server = dgram.createSocket('udp4');

game_server.on('listening', function () {
    var address = game_server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

game_server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);

});

game_server.bind(port);