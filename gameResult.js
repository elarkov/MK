import { randomNum, createElement, createReloadButton } from "./util.js";
import { arenas } from "./createPlayer.js";
import {logs, chat} from './gameLog.js';

const randomButton = document.querySelector('.button');

/**function displays the result of fight */
const showResult = (name) => {
  const resultText = createElement('div', 'winTitle');

  if (name) {
    resultText.innerHTML = `${name} wins!!!`;
  } else {
    resultText.innerHTML = 'Draw!!!';
  }

  return resultText;
};


const getResultFight = (fighterOne, fighterSecond) => {
  let restulFightInLog;
  /**when fighters have 0 points the button will disable */
  if (fighterOne.hp === 0 || fighterSecond.hp === 0) {
    randomButton.disabled = true;
    arenas.appendChild(createReloadButton());
  }

  /**if anyone has points 0 and less then opposition side to display name winner */
  if (fighterOne.hp === 0 && fighterOne.hp < fighterSecond.hp) {

    restulFightInLog = logs.end[randomNum(0, 2)].replace('[playerWins]', fighterSecond.name).replace('[playerLose]', fighterOne.name);

    chat.insertAdjacentHTML('afterbegin', restulFightInLog);
    arenas.appendChild(showResult(fighterSecond.name));

  } else if (fighterSecond.hp === 0 && fighterSecond.hp < fighterOne.hp) {

    restulFightInLog = logs.end[randomNum(0, 2)].replace('[playerWins]', fighterOne.name).replace('[playerLose]', fighterSecond.name);

    chat.insertAdjacentHTML('afterbegin', restulFightInLog);
    arenas.appendChild(showResult(fighterOne.name));

  } else if (fighterOne.hp === 0 && fighterSecond.hp === 0) {

    restulFightInLog = logs.draw;
    chat.insertAdjacentHTML('afterbegin', restulFightInLog);
    arenas.appendChild(showResult());
  }

}

export {getResultFight};