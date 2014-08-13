(function() {

    function Entity(pos, deg, sprite, maxSpeed) {
        this.pos = pos || [100, 100];
        this.deg = deg;
        this.setSprite(sprite);
        this.maxSpeed = maxSpeed;
    }

    Entity.prototype = {
        setSprite: function(sprite) {
            this.sprite = sprite;
            this.sprite.entity = this;
        }
    }

    window.Entity = Entity;

})();