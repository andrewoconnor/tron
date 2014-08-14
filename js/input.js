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
        handleInput: function (dt) {
            if (input.isDown('S') || input.isDown('s')) {
                player.pos[1] += player.maxSpeed * dt;
                player.deg = 180;
            }

            if (input.isDown('W') || input.isDown('w')) {
                player.pos[1] -= player.maxSpeed * dt;
                player.deg = 0;
            }

            if (input.isDown('A') || input.isDown('a')) {
                player.pos[0] -= player.maxSpeed * dt;
                player.deg = 270;
            }

            if (input.isDown('D') || input.isDown('d')) {
                player.pos[0] += player.maxSpeed * dt;
                player.deg = 90;
            }
        }
    }
})();