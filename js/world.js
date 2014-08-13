(function() {

    function World(pos, size, context){
        this.pos = pos || [0, 0];
        this.size = size || [5000, 3000];
        this.terrainPattern = null;
    }

    World.prototype = {
        init: function() {
            this.terrainPattern = context.createPattern(resources.get('img/terrain.png'), 'repeat');
            context.translate(-10, -10);
        }
    }

    window.World = World;
})();