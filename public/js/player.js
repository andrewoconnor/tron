(function() {

    function Player() {
        this.setPlayerNum(0);
        Entity.call(this, [500, 300], [19, 79], 0, new Sprite('img/bike.png'), [500, 100], [500, 100]);
        this.magnitude = [0, 0];
        this.addPlayer();
        this.login();
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.setPlayerNum = function(playerNum) {
        this.playerNum = playerNum;
    }

    Player.prototype.addPlayer = function() {
        socket.emit('add player');
    }

    Player.prototype.login = function() {
        socket.on('login', function (data) {
            console.log("Player num = " + data.numPlayers);
            this.setPlayerNum(data.numPlayers);
        });
    }

    window.Player = Player;

})();