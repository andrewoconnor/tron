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

//Create socket
var socket = io();

//Create canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);

resources.load([
    'img/terrain.png',
    'img/bike.png',
    'img/guy.png'
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
var clientNumber = 0;
var player = new Player();
var enemies = {};
//var enemy = new Entity([500, 300], [19, 79], 0, new Sprite('img/bike.png'), [500, 100], [500, 100]);
var camera = new Camera(player);
//var guy = new Entity([470, 300], [11, 17], 0, new Sprite('img/guy.png'), [500, 100], [500, 100])
//
socket.on('player joined', function (data) {
    if (data.playerNum != clientNumber) {
        console.log("got here");
        addEnemy(data);
    }
});

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

    input.handleInput(dt, player);
    camera.update();
    player.update(dt);
    updateEntities(dt);
}

function updateEntities(dt) {
    document.getElementById('debug').innerHTML = player.currentVelocity[0];
    document.getElementById('debug2').innerHTML = player.pos;
    document.getElementById('debug3').innerHTML = Math.abs(Math.cos(player.deg * (Math.PI / 180)));
    document.getElementById('debug4').innerHTML = clientNumber;
}

function render() {
	// Render the terrain
    //world.render();
    world.render(camera);
    // Render the player
    renderEntity(player);
//    renderEntity(guy);
    for (enemy in enemies)
        renderEntity(enemy);
}

function renderEntity(entity) {
    entity.sprite.render();
}


function addEnemy(data) {
    enemies[data.playerNum] = new Entity([500, 300], [19, 79], 0, new Sprite('img/bike.png'), [500, 100], [500, 100]);
}
