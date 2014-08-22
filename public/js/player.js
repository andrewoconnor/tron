(function() {

    function Player(playerNum) {
        this.playerNum = 0 || playerNum;
        Entity.call(this, [500, 300], [19, 79], 0, new Sprite('img/bike.png'), [500, 100], [500, 100]);
        this.magnitude = [0, 0];
        this.connect();
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;



    Player.prototype.connect = function() {
//        socket.emit('add player');
//        this.login();
    }

    Player.prototype.login = function() {
//        socket.on('login', function (data) {
//            clientNumber = parseInt(data.numPlayers);
//            addEnemies(data.numPlayers);
//        });
    }

    window.Player = Player;

})();