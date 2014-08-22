(function() {

    function Player() {
        this.playerNum = 0;
        Entity.call(this, [500, 300], [19, 79], 0, new Sprite('img/bike.png'), [500, 100], [500, 100]);
        this.magnitude = [0, 0];
        this.addPlayer();
        this.login();
    }

    function setPlayerNum(playerNum) {
        this.playerNum = playerNum;
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;



    Player.prototype.addPlayer = function() {
        socket.emit('add player');
    }

    Player.prototype.login = function() {
        socket.on('login', function (data) {

            var temp = parseInt(data.numPlayers);

            this.playerNum = temp;
            console.log("data = " + temp);
            console.log("playerNum = " + this.playerNum);
            document.getElementById('debug4').innerHTML = this.playerNum;
            setPlayerNum(temp);
        });

        console.log("playerNum = " + this.playerNum);
    }

    window.Player = Player;

})();