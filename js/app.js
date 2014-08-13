// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
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

var world = new World();

function init() {
    world.init();
	lastTime = Date.now();
	main();
}

// Game state

var player = new Player();
var camera = new Camera(player, world);

var lastFire = Date.now();
var gameTime = 0;
var isGameOver;

// The score
var score = 0;
var scoreEl = document.getElementById('score');

// Speed in pixels per second
var bulletSpeed = 500;
var enemySpeed = 100;

// Update game objects
function update(dt) {
    gameTime += dt;

    player.handleInput(dt);
    camera.update();
    updateEntities(dt);
}

function updateEntities(dt) {
    document.getElementById('debug').innerHTML = camera.pos;
}

function render() {
	// Render the terrain
    //world.render();
    camera.render();
    // Render the player
    renderEntity(player);
}

function renderEntity(entity) {
    entity.sprite.render();
}