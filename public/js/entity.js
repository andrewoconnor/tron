(function() {

    function Entity(pos, size, deg, sprite, maxVelocity, maxAcceleration) {
        this.pos = pos || [100, 100];
        this.deg = deg || 0;
        this.size = size || [0, 0];
        this.setSprite(sprite);
        this.maxVelocity = maxVelocity || [0, 0];
        this.maxAcceleration = maxAcceleration || [0,0];
        this.currentVelocity = [0, 0];
        this.currentAcceleration = [0, 0];
        this.lastForce = [0, 0];
    }

    Entity.prototype = {
        sendEntityData: function() {
            var message = {};
            message.push(this.pos);
            message.push(this.deg);

            socket.emit('entity moved', message);
        },
        checkWorldBounds: function() {
            if (this.pos[0] < 10 + ((this.size[0] + 1) / 2))
                this.pos[0] = 10 + ((this.size[0] + 1) / 2);
            if (this.pos[0] > world.size[0])
                this.pos[0] = world.size[0];
            if (this.pos[1] < 10 + ((this.size[0] + 1) / 2))
                this.pos[1] = 10 + ((this.size[0] + 1) / 2);
            if (this.pos[1] > world.size[1])
                this.pos[1] = world.size[1]
        },
        setVelocity: function(velocity) {
            this.velocity = velocity;
        },
        setSprite: function(sprite) {
            this.sprite = sprite;
            this.sprite.entity = this;
        },
        update: function(dt) {
//            this.currentVelocity[0] -= this.currentAcceleration[0] * dt;
//            if (this.currentVelocity[0] < 0)
//                this.currentVelocity[0] = 0;
//            this.currentAcceleration

            this.applyVelocity(this.currentVelocity[0], this.deg, dt);
            this.applyVelocity(this.lastForce[0], this.lastForce[1], dt);
            this.checkWorldBounds();
            this.sendEntityData();
//            var distance = this.currentVelocity[0] * dt;
//
//            if (this.deg > 0 && this.deg < 180)
//                this.pos[0] += distance * Math.abs(Math.sin(this.deg * (Math.PI / 180)));
//            else
//                this.pos[0] -= distance * Math.abs(Math.sin(this.deg * (Math.PI / 180)));
//            if (this.deg > 270 || this.deg < 90)
//                this.pos[1] -= distance * Math.abs(Math.cos(this.deg * (Math.PI / 180)));
//            else
//                this.pos[1] += distance * Math.abs(Math.cos(this.deg * (Math.PI / 180)));
//
//            this.magnitude[0] = distance * Math.abs(Math.sin(this.deg * (Math.PI / 180)));
//            this.magnitude[1] = distance * Math.abs(Math.cos(this.deg * (Math.PI / 180)));

//            this.currentVelocity[0] - (this.currentVelocity[0] / 4) < 0);
            if (!(input.isDown('W') || input.isDown('w'))) {
                this.currentVelocity[0] /= 1.015;
                this.lastForce[0] /= 1.02;
            }

            if (this.currentVelocity[0] < 11.5)
                this.currentVelocity[0] -= 0.3;

            if (this.currentVelocity[0] < 0)
                this.currentVelocity[0] = 0;

            if (this.lastForce[0] < 11.5)
                this.lastForce[0] -= 0.3;

            if (this.lastForce[0] < 0)
                this.lastForce[0] = 0;

        },
        applyVelocity : function(velocity, deg, dt) {
            var distance = velocity * dt;

            if (deg > 0 && deg < 180)
                this.pos[0] += distance * Math.abs(Math.sin(deg * (Math.PI / 180)));
            else
                this.pos[0] -= distance * Math.abs(Math.sin(deg * (Math.PI / 180)));
            if (deg > 270 || deg < 90)
                this.pos[1] -= distance * Math.abs(Math.cos(deg * (Math.PI / 180)));
            else
                this.pos[1] += distance * Math.abs(Math.cos(deg * (Math.PI / 180)));
        },
        accelerate: function(dt) {

            this.currentAcceleration[0] = this.maxAcceleration[0] - this.currentVelocity[0];

            if (this.currentVelocity[0] + this.currentAcceleration[0] * dt > this.maxVelocity[0])
                this.currentVelocity[0] = this.maxVelocity[0];
            else
                this.currentVelocity[0] += this.currentAcceleration[0] * dt;
//            var distance = this.maxVelocity[0] * dt;
//
            this.lastForce[0] = this.currentVelocity[0];
            this.lastForce[1] = this.deg;
        },
        rotateLeft: function(dt) {
            if (this.deg - this.maxVelocity[1] * dt < 0)
                this.deg = 360 + (this.deg - this.maxVelocity[1] * dt);
            else
                this.deg -= this.maxVelocity[1] * dt;
        },
        rotateRight: function(dt) {
            if (this.deg + this.maxVelocity[1] * dt > 360)
                this.deg = 360 - (this.deg - this.maxVelocity[1] * dt);
            else
                this.deg += this.maxVelocity[1] * dt;

        }
    }

    window.Entity = Entity;

})();