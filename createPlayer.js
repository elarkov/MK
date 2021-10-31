import { createElement } from "./util.js";
import { controlForm, enemyAttack, playerAttack } from "./gameAttack.js";
const arenas = document.querySelector('.arenas');

class Player {
  constructor(props) {
    this.id = props.id;
    this.className = props.className;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }

  changeHP = (num) => {
    this.hp -= num;
    if (this.hp <= 0) {
      this.hp = 0;
    }
  }

  elHP = () => {
    const playerLifeProgress = document.querySelector(`.player${this.id} .life`);
    return playerLifeProgress;
  }

  renderHP = () => {
    const lineProgress = this.elHP();
    console.log(lineProgress);
    const playerLifeScore = document.querySelector(`.player${this.id} .life-score`);

    lineProgress.style.width = this.hp + '%';
    playerLifeScore.innerText = `${this.hp} %`;

    if (this.hp <= 0) {
      playerLifeScore.innerText = 0;
    }
  }

  attack = () => {
    console.log(this.name + 'Fight...')
  }

  createPlayer = () => {
    const player = createElement('div');
    player.className = this.className.join(' ');
  
    const progressBar = createElement('div', 'progressbar');
    const character = createElement('div', 'character');
  
    const life = createElement('div', 'life');
    life.style.width = this.hp + '%';
  
    const lifeScore = createElement('div', 'life-score');
    lifeScore.innerText = this.hp;
  
    progressBar.appendChild(lifeScore);
  
    const name = createElement('div', 'name');
    name.innerText = this.name;
  
    const img = createElement('img');
    img.src = this.img;
    character.appendChild(img);
  
    player.appendChild(progressBar);
    player.appendChild(character);
    progressBar.appendChild(life);
    progressBar.appendChild(name);
  
    return player;
  }

  onSubmit = (fighterOne, fighterSecond) => {
  
    controlForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const enemy = enemyAttack();
      const player = playerAttack();
  
      if (player.defence !== enemy.hit) {
        fighterOne.changeHP(enemy.value);
        fighterOne.renderHP();
        generateLogs('hit', currentTimeFight, fighterSecond, fighterOne, enemy.value);
      } else {
        generateLogs('defence', currentTimeFight, fighterSecond, fighterOne, player.value);
      }
  
      if (enemy.defence !== player.hit) {
        fighterSecond.changeHP(player.value);
        fighterSecond.renderHP();
        generateLogs('hit', currentTimeFight, fighterOne, fighterSecond, player.value);
      } else {
        generateLogs('defence', currentTimeFight, fighterOne, fighterSecond, player.value);
      }
  
      getResultFight(logs);
  
    });
  };

}

export {arenas, Player};