(function() {

    function Entity(pos, size, deg, sprite, maxSpeed) {
        this.pos = pos || [100, 100];
        this.deg = deg || 0;
        this.size = size || [0, 0];
        this.setSprite(sprite);
        this.maxSpeed = maxSpeed || 0;
    }

    Entity.prototype = {
        setSprite: function(sprite) {
            this.sprite = sprite;
            this.sprite.entity = this;
        }
    }

    window.Entity = Entity;

})();