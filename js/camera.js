(function() {

    function Camera(entity, world){
        // follow entity
        this.pos = [0, 10];
        this.entity = entity;
        this.size = [800, 600];
        this.world = world;
    }

    Camera.prototype = {
        update: function() {
            //top left point of camera
            this.pos[0] = this.entity.pos[0] - (this.size[0] / 2);
            this.pos[1] = this.entity.pos[1] - (this.size[0] / 2);

            if (this.pos[0] < 0)
                this.pos[0] = 0;
            if (this.pos[1] < 0)
                this.pos[1] = 0;
        },
        render: function() {
            context.fillStyle = this.world.terrainPattern;
            context.fillRect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
        }
    }

    window.Camera = Camera;

})();