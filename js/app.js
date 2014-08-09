// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();


//Create canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

resources.load([
    'img/terrain.png',
    'img/bike.png'
]);

resources.onReady(init);

var lastTime;

function main() {
	var now = Date.now();
	var dt = (now - lastTime) / 1000.0;

	update(dt);
	render();

	lastTime = now;
	requestAnimFrame(main);
}

function init() {
	terrainPattern = context.createPattern(resources.get('img/terrain.png'), 'repeat');
	context.translate(10, 10);
	lastTime = Date.now();
	main();
}

// Game state
var player = {
	pos: [100,100],
    deg: 0,
	sprite: new Sprite('img/bike.png', [0, 0], [19, 79], 0, [0, 1])
};

var lastFire = Date.now();
var gameTime = 0;
var isGameOver;
var terrainPattern;

// The score
var score = 0;
var scoreEl = document.getElementById('score');

// Speed in pixels per second
var playerSpeed = 400;
var bulletSpeed = 500;
var enemySpeed = 100;

// Update game objects
function update(dt) {
    gameTime += dt;

    handleInput(dt);
    updateEntities(dt);
};

function handleInput(dt) {
    if(input.isDown('S') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;    
        player.deg = 180;
    }

    if(input.isDown('W') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
        player.deg = 0;
    }

    if(input.isDown('A') || input.isDown('a')) {
        player.pos[0] -= playerSpeed * dt;
        player.deg = 270;
    }

    if(input.isDown('D') || input.isDown('d')) {
        player.pos[0] += playerSpeed * dt;
        player.deg = 90;
    }
}

function updateEntities(dt) {
    // Update the player sprite animation
    player.sprite.update(player.pos, player.deg);
    document.getElementById('debug').innerHTML = player.sprite.needToRotate();
}


function render() {
	// Render the terrain
    context.fillStyle = terrainPattern;
    context.fillRect(-10, -10, canvas.width, canvas.height);

    // Render the player
    renderEntity(player);
}

function renderEntity(entity) {
    entity.sprite.render(context);
}