var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// player names which are currently connected to the game
var playerNames = {};
var numPlayers = 0;

app.get('/', function(req, res){
    res.sendFile('index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
        numPlayers--;
    });
    socket.on('add player', function () {
        //socket.playerNum = numPlayers;
        socket.emit('login', {
            numPlayers: numPlayers
        });
        numPlayers++;
        console.log('player number - ' + numPlayers);
    });

    socket.on('entity moved', function(data) {
        console.log('position - moved ' + data);
        socket.broadcast.emit('entity moved', {
            message: data
        });
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});