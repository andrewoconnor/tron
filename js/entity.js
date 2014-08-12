(function() {

    function Entity(pos, deg, sprite, maxSpeed) {
        this.pos = pos || [100, 100];
        this.deg = deg || 0;
        this.sprite = sprite;
        this.sprite.entity = this;
        this.maxSpeed = maxSpeed;
    }

    window.Entity = Entity;

})();