const canvas = document.querySelector("canvas");

const screen = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

screen.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
  }

  draw() {
    screen.fillStyle = "green";
    screen.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    }
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 10,
  },
});

// player.draw();

const enemy = new Sprite({
  position: {
    x: 800,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

// enemy.draw();

function animate() {
  window.requestAnimationFrame(animate);

  screen.fillStyle = "black";
  screen.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();
}

animate();
