import { createElement } from "./util.js";
import { getResultFight } from "./gameResult.js";
import { changeHP, elHP, renderHP } from "./gameProgress.js";
import { controlForm, enemyAttack, playerAttack } from "./gameAttack.js";
import { chat, logs, generateLogs } from "./gameLog.js";

const fighterOne = {
  id: 1,
  className: ['player1', 'js-player-one'],
  name: 'Subzero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: [' kori blade', 'shurikens', 'ice bomb'],
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
  attack: function () {
    console.log(this.name + 'Fight...')
  }
};

const fighterSecond = {
  id: 2,
  className: ['player2', 'js-player-second'],
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['homura kunai', 'donryu\'s fire', 'hellfire kunai'],
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
  attack: function () {
    console.log(this.name + 'Fight...')
  }
};
const arenas = document.querySelector('.arenas');
const timeDate = new Date();
const currentTimeFight = timeDate.getHours() + ':' + timeDate.getMinutes();

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


/**Start fight in log */
const startChat = () => {
  const startText = logs["start"].replace('[time]', currentTimeFight).replace('[player1]', fighterOne["name"]).replace('[player2]', fighterSecond["name"]);
  const el = `<p>${startText}</p>`;
  chat.insertAdjacentHTML('afterbegin', el);
}
window.addEventListener('DOMContentLoaded', startChat);


controlForm.addEventListener('submit',(event) => {
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

export {arenas, fighterOne, fighterSecond};