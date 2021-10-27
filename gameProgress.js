/**function changes  the fighter's lifeprogress */
function changeHP(num) {
  this.hp -= num;
  /**if player has points 0 to do it */
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  const playerLifeProgress = document.querySelector(`.player${this.id} .life`);
  return playerLifeProgress;
}

function renderHP() {
  const lineProgress = this.elHP();
  const playerLifeScore = document.querySelector(`.player${this.id} .life-score`);

  lineProgress.style.width = this.hp + '%';
  playerLifeScore.innerText = `${this.hp} %`;

  if (this.hp <= 0) {
    playerLifeScore.innerText = 0;
  }
}

export {changeHP, elHP, renderHP};