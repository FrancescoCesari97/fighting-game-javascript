const canvas = document.querySelector("canvas");

const screen = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

screen.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    screen.fillStyle = "green";
    screen.fillRect(this.position.x, this.position.y, 50, 150);
  }

  update() {
    this.draw();
    this.position.y += 10;
  }
}

const player = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    Y: 0,
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
    Y: 0,
  },
});

// enemy.draw();

function animate() {
  window.requestAnimationFrame(animate);
  player.update();
  enemy.update();
}

animate();
