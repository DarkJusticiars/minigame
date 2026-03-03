const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const backgroundImage = new Image();
backgroundImage.src = "background.png";

// Create image object
const playerImage = new Image();
playerImage.src = "player.png"; // MUST match file name exactly

let player = {
    x: 50,
    y: 130,
    width: 40,
    height: 40,
    velocityY: 0,
    jumping: false
};

let obstacle = {
    x: 600,
    y: 150,
    width: 20,
    height: 20
};

const gravity = 0.5;

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Gravity
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Ground collision
    if (player.y > 130) {
        player.y = 130;
        player.velocityY = 0;
        player.jumping = false;
    }

    // Move obstacle
    obstacle.x -= 5;

    if (obstacle.x < -20) {
        obstacle.x = 600;
    }

    // Collision detection
    if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
    ) {
        alert("Game Over");
        obstacle.x = 600;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        backgroundImage,
        0,
        0,
        canvas.width,
        canvas.height + 10
    );


    // Draw the player image
    ctx.drawImage(
        playerImage,
        player.x,
        player.y,
        player.width +30,
        player.height +30
    );

    // Draw obstacle (still rectangle)
    ctx.fillRect(
        obstacle.x,
        obstacle.y+10,
        obstacle.width,
        obstacle.height
    );
}

// Wait until image loads before starting game
playerImage.onload = function () {
    gameLoop();
};

document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && !player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});