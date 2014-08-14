(function() {

    function Player() {
        Entity.call(this, [400, 300], [19, 79], 0, new Sprite('img/bike.png'), 400);
    }

    Player.prototype = Object.create(Entity.prototype);
    Player.prototype.constructor = Player;

    window.Player = Player;

})();