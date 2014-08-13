(function() {

    function Player(name) {
        this.name = name || "unnamed";
        Entity.call(this, [100, 100], 0, new Sprite('img/bike.png', [19, 79]), 400);
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.handleInput = function (dt) {
        if(input.isDown('S') || input.isDown('s')) {
            player.pos[1] += player.maxSpeed * dt;
            player.deg = 180;
        }

        if(input.isDown('W') || input.isDown('w')) {
            player.pos[1] -= player.maxSpeed * dt;
            player.deg = 0;
        }

        if(input.isDown('A') || input.isDown('a')) {
            player.pos[0] -= player.maxSpeed * dt;
            player.deg = 270;
        }

        if(input.isDown('D') || input.isDown('d')) {
            player.pos[0] += player.maxSpeed * dt;
            player.deg = 90;
        }
    }

    window.Player = Player;

})();