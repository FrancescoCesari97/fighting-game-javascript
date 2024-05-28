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

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);
  if (player.health === enemy.health) {
    const tieElement = document.querySelector("#Winner");
    tieElement.innerHTML = "<h2>Tie</h2>";
    tieElement.classList.add("display-flex");
  } else if (player.health > enemy.health) {
    const tieElement = document.querySelector("#Winner");
    tieElement.innerHTML = "<h2>player-1 Won</h2>";
    tieElement.classList.add("display-flex");
  } else {
    const tieElement = document.querySelector("#Winner");
    tieElement.innerHTML = "<h2>player-2 Won</h2>";
    tieElement.classList.add("display-flex");
  }
}

let timer = 60;
let timerId;
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000);
    timer--;
    document.querySelector("#timer").innerHTML = timer;
  }
  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}
