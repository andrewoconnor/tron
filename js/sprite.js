(function() {	
	function Sprite(url, pos, size, speed, frames, dir, once, deg, facing) {
		this.pos = pos;
		this.size = size;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.frames = frames;
		this._index = 0;
		this.url = url;
		this.dir = dir || 'up';
		this.once = once;
		this.deg = deg || 0;
	}

	Sprite.prototype = {
		needToRotate: function() {
			return (this.deg == 0 && this.dir != 'up') ||
			    (this.deg == 180 && this.dir != 'down') ||
                (this.deg == 90 && this.dir != 'right') ||
			    (this.deg == 270 && this.dir != 'left');
		},
		update: function(pos, deg) {
			this.pos = pos;
			this.deg = deg;
		},
		render: function(context) {

			var x = this.pos[0];
            var y = this.pos[1];

            var rot_x = -(this.size[0] + 1) / 2;
            //var rot_y = -(this.size[1] + 1) / 2;
            //var rot_x = 0;
            var rot_y = 0;

            context.save();
    		context.translate(x, y);
    		if(this.needToRotate()) {
    			context.rotate(this.deg * Math.PI / 180);
			}
			context.drawImage(resources.get(this.url), rot_x, rot_y);
			context.restore();

		}
	}

	window.Sprite = Sprite;

})();