(function() {

    function Player() {
        Entity.call(this, [500, 300], [19, 79], 0, new Sprite('img/bike.png'), [500, 100], [500, 100]);
        this.magnitude = [0, 0];
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    window.Player = Player;

})();