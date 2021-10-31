import { startChat, generateLogs, currentTimeFight } from "./gameLog.js";

import { arenas, Player } from './createPlayer.js';
import { randomNum } from "./util.js";
import { getResultFight } from "./gameResult.js";
import {playerAttack} from './gameAttack.js';

const controlForm = document.querySelector('.control');

// let fighterOne;
// let fighterSecond;

export class Game {
  constructor(props) { // {p1, p2}
    // this.p1 = props.p1,
    // this.p2 = props.p2

    this.fighterOne = new Player({
      ...props.p1,
      className: ['player1', 'js-player-one'],
    });
    this.fighterSecond = new Player({
      ...props.p2,
      className: ['player2', 'js-player-second'],
    });
   }

  static getPlayers = async () => {
    const data = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then((response) => response.json());
    return data;
  }

  static getRandomPlayer = async () => {
    const data = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then((response) => response.json());
    return data;
  }

  start = async () => {
    // const players = await this.getPlayers();
    // const p1 = players[randomNum(0, players.length)];
    // const p2 = players[randomNum(0, players.length)];

    // fighterOne = new Player({
    //   ...p1,
    //   className: ['player1', 'js-player-one'],
    // });
    // fighterSecond = new Player({
    //   ...p2,
    //   className: ['player2', 'js-player-second'],
    // });

    arenas.appendChild(this.fighterOne.createPlayer());
    arenas.appendChild(this.fighterSecond.createPlayer());


    // fighterOne.onSubmit(fighterOne, fighterSecond);
    // fighterSecond.onSubmit(fighterOne, fighterSecond);
    controlForm.addEventListener('submit', (event) => this.onSubmit(event));

    
    startChat(this.fighterOne, this.fighterSecond);
    
  }

  onSubmit = async (event) => {
      event.preventDefault();
      const q = await (fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight',
      {
        method: 'POST',
        body: JSON.stringify(playerAttack())
      }).then((response) => response.json()))

    const {player1: player, player2: enemy} = q;
    console.log(q, player, enemy)

    if (player.defence !== enemy.hit) {
      this.fighterOne.changeHP(enemy.value);
      this.fighterOne.renderHP();
      generateLogs('hit', currentTimeFight, this.fighterSecond, this.fighterOne, enemy.value);
    } else {
      generateLogs('defence', currentTimeFight, this.fighterSecond, this.fighterOne, player.value);
    }

    if (enemy.defence !== player.hit) {
      this.fighterSecond.changeHP(player.value);
      this.fighterSecond.renderHP();
      generateLogs('hit', currentTimeFight, this.fighterOne, this.fighterSecond, player.value);
    } else {
      generateLogs('defence', currentTimeFight, this.fighterOne, this.fighterSecond, player.value);
    }

    getResultFight(this.fighterOne, this.fighterSecond);

  }

 

}




// const game = new Game();

// export default game;

