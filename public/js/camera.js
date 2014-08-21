(function() {

    function Camera(entity){
        // follow entity
        this.deadzone = [canvas.width/2, canvas.height/2];
        this.pos = [0, 0];
        //this.entity = entity;
        this.size = [800, 600];
        this.follow(entity);
    }

    Camera.prototype = {
        follow: function(entity) {
            this.entity = entity;
        },
        update: function() {
            //top left point of camera
            this.pos[0] = this.entity.pos[0] - this.deadzone[0];
            this.pos[1] = this.entity.pos[1] - this.deadzone[1];

            this.checkWorldBounds();
        },
        checkWorldBounds: function() {
            if (this.pos[0] < 0)
                this.pos[0] = 0;
            if (this.pos[1] < 0)
                this.pos[1] = 0;
            if (this.pos[0] + canvas.width > world.size[0])
                this.pos[0] = world.size[0] - canvas.width;
            if (this.pos[1] + canvas.height > world.size[1])
                this.pos[1] = world.size[1] - canvas.height;
        }
    }

    window.Camera = Camera;

})();