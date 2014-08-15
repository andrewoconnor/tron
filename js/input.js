(function() {
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        switch(code) {
            case 32:
                key = 'SPACE'; break;
            case 65:
                key = 'A'; break;
            case 87:
                key = 'W'; break;
            case 68:
                key = 'D'; break;
            case 83:
                key = 'S'; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function() {
        pressedKeys = {};
    });

    window.input = {
        isDown: function (key) {
            return pressedKeys[key.toUpperCase()];
        },
        handleInput: function (dt, player) {
            if (input.isDown('S') || input.isDown('s')) {
//                player.pos[1] += player.maxSpeed[0] * dt;
//                player.deg += 180;
            }

            if (input.isDown('W') || input.isDown('w')) {
                distance = player.maxSpeed[0] * dt;
//                var angle = 0;
//                if (player.deg - 90 < 0)
//                    angle = (360 + player.deg - 90);
                if (player.deg > 0 && player.deg < 180)
                    player.pos[0] = player.pos[0] + distance * Math.abs(Math.sin(player.deg * (Math.PI / 180)));
                else
                    player.pos[0] = player.pos[0] - distance * Math.abs(Math.sin(player.deg * (Math.PI / 180)));
                if (player.deg > 270 || player.deg < 90)
                    player.pos[1] = player.pos[1] - distance * Math.abs(Math.cos(player.deg * (Math.PI / 180)));
                else
                    player.pos[1] = player.pos[1] + distance * Math.abs(Math.cos(player.deg * (Math.PI / 180)));

                player.magnitude[0] = distance * Math.abs(Math.sin(player.deg));
                player.magnitude[1] = distance * Math.abs(Math.cos(player.deg));
                //player.deg = 0;
//                player.pos[1] -= player.maxSpeed[0] * dt;
//                player.deg = 0;
            }

            if (input.isDown('A') || input.isDown('a')) {
                //player.pos[0] -= player.maxSpeed * dt;
                //player.deg = 270;
//                player.deg -= player.maxSpeed[1] * dt;
                if (player.deg - player.maxSpeed[1] * dt < 0)
                    player.deg = 360 + (player.deg - player.maxSpeed[1] * dt);
                else
                    player.deg -= player.maxSpeed[1] * dt;
            }

            if (input.isDown('D') || input.isDown('d')) {
//                player.pos[0] += player.maxSpeed * dt;
//                player.deg = 90;
//                player.deg += player.maxSpeed[1] * dt;
                if (player.deg + player.maxSpeed[1] * dt > 360)
                    player.deg = 360 - (player.deg - player.maxSpeed[1] * dt);
                else
                    player.deg += player.maxSpeed[1] * dt;
            }
        }
    }
})();