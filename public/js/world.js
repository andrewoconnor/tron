(function() {

    function World(pos, size){
        this.pos = pos || [0, 0];
        this.size = size || [5000, 3000];
        this.terrainPattern = null;
    }

    World.prototype = {
        init: function() {
            this.terrainPattern = context.createPattern(resources.get('img/terrain.png'), 'repeat');
            context.translate(-10, -10);
            context.fillStyle = this.terrainPattern;
        },
        render: function() {

            context.save();

            context.translate(-camera.pos[0], -camera.pos[1]);
            context.fillRect(camera.pos[0], camera.pos[1], canvas.width + 10, canvas.height + 10);
            context.restore();
        }
    }

    window.World = World;
})();