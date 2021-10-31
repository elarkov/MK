import {startChat } from "./gameLog.js";

import {arenas, Player} from './createPlayer.js';
import { randomNum } from "./util.js";
import { getResultFight } from "./gameResult.js";

let fighterOne;
let fighterSecond;

class Game {
  constructor(props) {}

  getPlayers = async () => {
    const data = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then((response) => response.json());
    return data;
  }

  start = async () => {
    const players = await this.getPlayers();
    const p1 = players[randomNum(0, players.length)];
    const p2 = players[randomNum(0, players.length)];

    fighterOne = new Player({
      ...p1,
      className: ['player1', 'js-player-one'],
    });
    fighterSecond = new Player({
      ...p2,
      className: ['player2', 'js-player-second'],
    });

    arenas.appendChild(fighterOne.createPlayer());
    arenas.appendChild(fighterSecond.createPlayer());

    
    fighterOne.onSubmit(fighterOne, fighterSecond);
    fighterSecond.onSubmit(fighterOne, fighterSecond);

    window.addEventListener('DOMContentLoaded', startChat(fighterOne, fighterSecond));
  }


}


// class Game {
//   constructor(props) {}

//   start = () => {
    // controlForm.addEventListener('submit',(event) => {
    //   event.preventDefault();
    
    //   const enemy = enemyAttack();
    //   const player = playerAttack();
    
    //   if (player.defence !== enemy.hit) {
    //     fighterOne.changeHP(enemy.value);
    //     fighterOne.renderHP();
    //     generateLogs('hit', currentTimeFight, fighterSecond, fighterOne, enemy.value);
    //   } else {
    //     generateLogs('defence', currentTimeFight, fighterSecond, fighterOne, player.value);
    //   }
    
    //   if (enemy.defence !== player.hit) {
    //     fighterSecond.changeHP(player.value);
    //     fighterSecond.renderHP();
    //     generateLogs('hit', currentTimeFight, fighterOne, fighterSecond, player.value);
    //   } else {
    //     generateLogs('defence', currentTimeFight, fighterOne, fighterSecond, player.value);
    //   }
    
    //   getResultFight(logs);
    
    //});
  //}

// }


const game = new Game();

export default game;

