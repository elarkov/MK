import { getResultFight } from "./gameResult.js";
import { controlForm, enemyAttack, playerAttack } from "./gameAttack.js";
import { chat, logs, generateLogs } from "./gameLog.js";
import { fighterOne, fighterSecond } from "./createPlayer.js";

const timeDate = new Date();
const currentTimeFight = timeDate.getHours() + ':' + timeDate.getMinutes();

class Game {
  constructor(props) {
    this.startChat = props.startChat;
    this.controlForm = props.controlForm;
  }

  start = () => {
    console.log('Game starts!');
  }
}

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

const game = new Game({
  startChat: startChat,
  controlForm: controlForm,
});

export {game};

