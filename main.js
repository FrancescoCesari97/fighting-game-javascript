const canvas = document.querySelector("canvas");

const screen = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

screen.fillRect(0, 0, canvas.width, canvas.height);

class Sprite {
  constructor(position) {
    this.position = position;
  }

  draw() {
    screen.fillStyle = "green";
    screen.fillRect(this.position.x, this.position.y, 50, 150);
  }
}

const player = new Sprite({
  x: 0,
  y: 0,
});

player.draw();

const enemy = new Sprite({
  x: 800,
  y: 0,
});

enemy.draw();

function animate() {
  window.requestAnimationFrame(animate);
  console.log("go");
}

animate();
