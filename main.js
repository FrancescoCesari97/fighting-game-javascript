const canvas = document.querySelector("canvas");

const screen = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

screen.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;
class Sprite {
  constructor({ position, velocity, color = "green", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;

    this.attackSwing = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },

      offset,

      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
  }

  draw() {
    screen.fillStyle = this.color;
    screen.fillRect(this.position.x, this.position.y, this.width, this.height);

    // attackSwing
    if (this.isAttacking) {
      screen.fillStyle = "red";
      screen.fillRect(
        this.attackSwing.position.x,
        this.attackSwing.position.y,
        this.attackSwing.width,
        this.attackSwing.height
      );
    }
  }

  update() {
    this.draw();

    this.attackSwing.position.x = this.position.x + this.attackSwing.offset.x;
    this.attackSwing.position.y = this.position.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }
  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}

// player.draw();
const player = new Sprite({
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
});

// enemy.draw();
const enemy = new Sprite({
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

function swingCollision({ swing1, swing2 }) {
  return (
    swing1.attackSwing.position.x + swing1.attackSwing.width >=
      swing2.position.x &&
    swing1.attackSwing.position.x <= swing2.position.x + swing2.width &&
    swing1.attackSwing.position.y + swing1.attackSwing.height >=
      swing2.position.y &&
    swing1.attackSwing.position.y <= swing2.position.y + swing2.height
  );
}

function animate() {
  window.requestAnimationFrame(animate);

  screen.fillStyle = "black";
  screen.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  // player movement
  player.velocity.x = 0;
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
  }

  // enemy movement
  enemy.velocity.x = 0;
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
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
