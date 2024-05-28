const canvas = document.querySelector("canvas");

const screen = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

screen.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "./img/Background-1.png",
});

const shop = new Sprite({
  position: {
    x: 780,
    y: 295,
  },
  imgSrc: "./img/shop_anim.png",
  scale: 1.5,
  frameMax: 6,
});

// player.draw();
const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },

  offset: {
    x: 0,
    y: 0,
  },
  imgSrc: "./img/Samurai-Sprites/idle.png",
  frameMax: 8,
  scale: 2,
  offset: {
    x: 0,
    y: 95,
  },
  sprites: {
    idle: {
      imgSrc: "./img/Samurai-Sprites/idle.png",
      frameMax: 8,
    },
    run: {
      imgSrc: "./img/Samurai-Sprites/Run.png",
      frameMax: 8,
    },
    jump: {
      imgSrc: "./img/Samurai-Sprites/jump.png",
      frameMax: 2,
    },
    fall: {
      imgSrc: "./img/Samurai-Sprites/Fall.png",
      frameMax: 2,
    },
    attack1: {
      imgSrc: "./img/Samurai-Sprites/Attack1.png",
      frameMax: 6,
    },
  },
});

// enemy.draw();
const enemy = new Fighter({
  position: {
    x: 800,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",

  offset: {
    x: -50,
    y: 0,
  },
  imgSrc: "./img/Viking-Sprite/idle.png",
  frameMax: 10,
  scale: 2,
  offset: {
    x: 0,
    y: 15,
  },
  sprites: {
    idle: {
      imgSrc: "./img/Viking-Sprite/idle.png",
      frameMax: 10,
    },
    run: {
      imgSrc: "./img/Viking-Sprite/Run.png",
      frameMax: 8,
    },
    jump: {
      imgSrc: "./img/Viking-Sprite/jump.png",
      frameMax: 3,
    },
    fall: {
      imgSrc: "./img/Viking-Sprite/Fall.png",
      frameMax: 3,
    },
    attack1: {
      imgSrc: "./img/Viking-Sprite/Attack1.png",
      frameMax: 7,
    },
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },

  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

let lastKey;

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);

  screen.fillStyle = "black";
  screen.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  player.update();
  enemy.update();

  // player movement
  player.velocity.x = 0;

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // enemy movement
  enemy.velocity.x = 0;

  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // detect for collision
  if (
    swingCollision({
      swing1: player,
      swing2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 20;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }

  if (
    swingCollision({
      swing1: enemy,
      swing2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 20;
    document.querySelector("#playerHealth").style.width = player.health + "%";
  }

  // end the game based on health

  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;

    case "a":
      keys.a.pressed = true;
      player.lastKey = "a";
      break;

    case "w":
      player.velocity.y = -15;
      break;

    case " ":
      player.attack();
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;

    case "ArrowUp":
      enemy.velocity.y = -15;
      break;

    case "p":
      enemy.attack();
      break;
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;

    case "a":
      keys.a.pressed = false;
      break;
  }

  //enemy keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;

    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
  console.log(event.key);
});
