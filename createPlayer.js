import { createElement } from "./util.js";

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

}

const fighterOne = new Player({
  id: 1,
  className: ['player1', 'js-player-one'],
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: [' kori blade', 'shurikens', 'ice bomb'],
});

const fighterSecond = new Player({
  id: 2,
  className: ['player2', 'js-player-second'],
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['homura kunai', 'donryu\'s fire', 'hellfire kunai'],
});

/**function creates DOM of fighter on game field */
const createPlayer = (fighter) => {
  const player = createElement('div');
  player.className = fighter.className.join(' ');

  const progressBar = createElement('div', 'progressbar');
  const character = createElement('div', 'character');

  const life = createElement('div', 'life');
  life.style.width = fighter.hp + '%';

  const lifeScore = createElement('div', 'life-score');
  lifeScore.innerText = fighter.hp;

  progressBar.appendChild(lifeScore);

  const name = createElement('div', 'name');
  name.innerText = fighter.name;

  const img = createElement('img');
  img.src = fighter.img;
  character.appendChild(img);

  player.appendChild(progressBar);
  player.appendChild(character);
  progressBar.appendChild(life);
  progressBar.appendChild(name);

  return player;

};

arenas.appendChild(createPlayer(fighterOne));
arenas.appendChild(createPlayer(fighterSecond));

export {arenas, fighterOne, fighterSecond};