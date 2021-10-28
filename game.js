import { getResultFight } from "./gameResult.js";
import { controlForm, enemyAttack, playerAttack } from "./gameAttack.js";
import { logs, generateLogs, currentTimeFight } from "./gameLog.js";
import {fighterOne, fighterSecond} from './createPlayer.js';

class Game {
  constructor(props) {
   
  }

  start = () => {
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
  }

}


const game = new Game();

export {game};

