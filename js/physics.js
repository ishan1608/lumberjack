var Physics = {
    update: function (data) {
        Physics.helpers.gravity(data.entities.jack);
        Physics.collisionDetection(data);
    },
    
    collisionDetection: function(data) {
        var jack = data.entities.jack;
        
        var entityCollisionCheck = function (entity) {
            if (jack.x < entity.x + entity.w && 
               jack.x + jack.w > entity.x &&
               jack.y < entity.y + entity.h &&
               jack.y + jack.h > entity.y) {
                // Collision Occured
                Physics.handleCollision(data, entity);
            }
        };
        
        data.entities.wallsArray.forEach(function (wall) {
            entityCollisionCheck(wall);
        });
        
        entityCollisionCheck(data.entities.exitPipe);
        
        data.entities.coinsArray.forEach(function (coin) {
            entityCollisionCheck(coin);
        });
    },
    
    handleCollision: function(data, entity) {
        var jack = data.entities.jack;
        
        if (entity.type === "wall") {
            // Left side Wall collision
            if (jack.x < entity.x && jack.y >= entity.y) {
                jack.x = entity.x - jack.w;
            }
            
            // Right side Wall collision
            if (jack.x > entity.x && jack.y >= entity.y) {
                jack.x = entity.x + entity.w;
            }
            
            // Top of Wall
            if (jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 
                && jack.x < (entity.x + entity.w) - 10
                && jack.velY >= 0) {
                jack.currentState = jack.states.standing;
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }
        
        if (entity.type === 'coin') {
            var coinsArray = data.entities.coinsArray;
            var coinSound = entity.sound.cloneNode();
            var index = coinsArray.indexOf(entity);
            
            data.entities.score.value += 1;
            
            coinSound.play();
            coinsArray.splice(index, 1);
        }
        
        if (entity.type === 'exitPipe') {
            // Left side pipe collision
            if (jack.x < entity.x && jack.y >= entity.y) {
                if (jack.velY === 0) {
                    jack.x += 200;
                } else {
                    jack.x = entity.x - jack.w;
                }
            }
            
            // Right side pipe collision
            if (jack.x > entity.x && jack.y >= entity.y) {
                jack.x = entity.x + entity.w;
            }
            
            // Top of pipe collision
            if (jack.y < entity.y && (jack.x + jack.w) > entity.x + 10 
                && jack.x < (entity.x + entity.w) - 10
                && jack.velY >= 0) {
                jack.currentState = jack.states.standing;
                jack.y = entity.y - jack.h;
                jack.velY = 0;
            }
        }
    },
    
    helpers: {
        gravity: function(entity) {
            entity.velY += 1.2;
            entity.y += entity.velY
        }
    }
};