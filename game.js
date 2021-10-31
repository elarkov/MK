import { startChat, generateLogs, currentTimeFight } from "./gameLog.js";
import { arenas, Player } from './createPlayer.js';
import { getResultFight } from "./gameResult.js";
import {playerAttack} from './gameAttack.js';

const controlForm = document.querySelector('.control');

export class Game {
  constructor(props) {

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
    return JSON.parse(localStorage.getItem('player1')) || data;
  }

  static getRandomPlayer = async () => {
    const data = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then((response) => response.json());
    return data;
  }

  start = async () => {
    arenas.appendChild(this.fighterOne.createPlayer());
    arenas.appendChild(this.fighterSecond.createPlayer());
    controlForm.addEventListener('submit', (event) => this.onSubmit(event));

    startChat(this.fighterOne, this.fighterSecond);
    
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const q = await (fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight',
    {
      method: 'POST',
      body: JSON.stringify(playerAttack())
    }).then((response) => response.json())
    )
    const {player1: player, player2: enemy} = q;

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

