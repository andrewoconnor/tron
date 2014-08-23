//var PeerServer = require('peer').PeerServer;
//var server = new PeerServer({port: 57888});

var app = require('express')();
var server = require('http').createServer(app);
var webRTC = require('webrtc.io').listen(server);

var port = process.env.PORT || 57888;
server.listen(port);

//var io = require('socket.io')(http);

app.use(app.static(__dirname + '/public'));
// player names which are currently connected to the game
//var playerNames = {};
//var numPlayers = 0;
//
app.get('/', function(req, res){
    res.sendFile('index.html');
});

webRTC.rtc.on('add player', function(data, socket) {

});

//server.on('connection', function(id) {
//    console.log('user ' + id + ' connected');
//});

//var game_server = new Peer('server', {host: 'localhost', port: 57888});
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