(function() {
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        switch(code) {
            case 13:
                key = 'ENTER'; break;
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
            }

            if (input.isDown('W') || input.isDown('w')) {
                player.accelerate(dt);
            }

            if (input.isDown('A') || input.isDown('a')) {
                player.rotateLeft(dt);
            }

            if (input.isDown('D') || input.isDown('d')) {
                player.rotateRight(dt);
            }
        }
    }
})();