(function() {

    function Entity(pos, size, deg, sprite, maxSpeed) {
        this.pos = pos || [100, 100];
        this.deg = deg || 0;
        this.size = size || [0, 0];
        this.setSprite(sprite);
        this.maxSpeed = maxSpeed || [0, 0];
    }

    Entity.prototype = {
        setVelocity: function(velocity) {
            this.velocity = velocity;
        },
        setSprite: function(sprite) {
            this.sprite = sprite;
            this.sprite.entity = this;
        },
        update: function() {
        },
        accelerate: function(dt) {

            var distance = this.maxSpeed[0] * dt;

            if (this.deg > 0 && this.deg < 180)
                this.pos[0] += distance * Math.abs(Math.sin(this.deg * (Math.PI / 180)));
            else
                this.pos[0] -= distance * Math.abs(Math.sin(this.deg * (Math.PI / 180)));
            if (this.deg > 270 || this.deg < 90)
                this.pos[1] -= distance * Math.abs(Math.cos(this.deg * (Math.PI / 180)));
            else
                this.pos[1] += distance * Math.abs(Math.cos(this.deg * (Math.PI / 180)));

            this.magnitude[0] = distance * Math.abs(Math.sin(this.deg * (Math.PI / 180)));
            this.magnitude[1] = distance * Math.abs(Math.cos(this.deg * (Math.PI / 180)));
        },
        rotateLeft: function(dt) {
            if (this.deg - this.maxSpeed[1] * dt < 0)
                this.deg = 360 + (this.deg - this.maxSpeed[1] * dt);
            else
                this.deg -= this.maxSpeed[1] * dt;
        },
        rotateRight: function(dt) {
            if (this.deg + this.maxSpeed[1] * dt > 360)
                this.deg = 360 - (this.deg - this.maxSpeed[1] * dt);
            else
                this.deg += this.maxSpeed[1] * dt;
        }
    }

    window.Entity = Entity;

})();