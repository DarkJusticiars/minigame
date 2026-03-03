const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "background.png";

const playerImage = new Image();
playerImage.src = "player.png";
const obstacleImage = new Image();
obstacleImage.src = "obstacle.png"
const bgMusic = new Audio("THEME_SONG.m4a");
bgMusic.loop = true;      
bgMusic.volume = 0.4;
let musicplaying = false;


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

const gravity = 0.4;

let gameSpeed = 2.8;
let score = 0;

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
   
    score += 1;
    gameSpeed += 0.001;

    // Gravity
    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y > 130) {
        player.y = 130;
        player.velocityY = 0;
        player.jumping = false;
    }

    // Use gameSpeed instead of fixed 5
    obstacle.x -= gameSpeed;

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
        // Reset game instead of just alert
        alert("Game Over");

        obstacle.x = 600;
        score = 0;
        gameSpeed = 2.8;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.drawImage(
        backgroundImage,
        0,
        0,
        canvas.width,
        canvas.height + 10
    );

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + Math.floor(score), 20, 30);

    // Player image
    ctx.drawImage(
        playerImage,
        player.x,
        player.y,
        player.width + 30,
        player.height + 30
    );

    // Obstacle
    ctx.drawImage(
        obstacleImage,
        obstacle.x,
        obstacle.y-15,
        obstacle.width+50,
        obstacle.height+50
    );
}

// Start game after player image loads
playerImage.onload = function () {
    gameLoop();
};

document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
         if(!musicplaying){
         bgMusic.play();
         musicplaying = true;}
        if (!player.jumping) {
            player.velocityY = -10;
            player.jumping = true;
        }
    }
   
});