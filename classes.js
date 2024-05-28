class Sprite {
  constructor({ position, imgSrc, scale = 1, frameMax = 1 }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image();
    this.image.src = imgSrc;
    this.scale = scale;
    this.frameMax = frameMax;
    this.frameCurrent = 0;
    this.frameElapsed = 0;
    this.framesHold = 8;
  }

  draw() {
    screen.drawImage(
      this.image,
      this.frameCurrent * (this.image.width / this.frameMax),
      0,
      this.image.width / this.frameMax,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frameMax) * this.scale,
      this.image.height * this.scale
    );
  }

  update() {
    this.draw();
    this.frameElapsed++;

    if (this.frameElapsed % this.framesHold === 0)
      if (this.frameCurrent < this.frameMax - 1) {
        this.frameCurrent++;
      } else {
        this.frameCurrent = 0;
      }
  }
}

class Fighter {
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

    if (this.position.y + this.height + this.velocity.y >= canvas.height - 31) {
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
