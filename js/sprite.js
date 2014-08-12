(function() {	
	function Sprite(url, size, speed, frames, dir, once, entity) {
		this.size = size;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.frames = frames;
		this._index = 0;
		this.url = url;
		this.dir = dir || 'up';
		this.once = once;
        this.entity = entity;
	}

	Sprite.prototype = {
		needToRotate: function() { return (this.entity.deg != 0); },
		render: function(context) {

			var x = this.entity.pos[0];
            var y = this.entity.pos[1];

            var rot_x = -(this.size[0] + 1) / 2;
            //var rot_y = -(this.size[1] + 1) / 2;
            //var rot_x = 0;
            var rot_y = 0;

            context.save();
    		context.translate(x, y);
    		if (this.needToRotate) {
    			context.rotate(this.entity.deg * Math.PI / 180);
			}
			context.drawImage(resources.get(this.url), rot_x, rot_y);
			context.restore();

		}
	}

	window.Sprite = Sprite;

})();