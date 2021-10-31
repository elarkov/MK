/*Function generates attack eneymy*/
import { randomNum } from "./util.js";

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const MINNUM = 1;
const MAXNUM = 20;
export const controlForm = document.querySelector('.control');


function enemyAttack() {
  const hit = ATTACK[randomNum(0, 2)];
  const defence = ATTACK[randomNum(0, 2)];

  return {
    value: randomNum(MINNUM, HIT[hit]),
    hit,
    defence
  }
}

/*Function generates attack player*/
function playerAttack() {
  const attack = {};

  for (let item of controlForm) {
    if (item.checked && item.name === 'hit') {
      attack.value = randomNum(MINNUM, HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

export {MINNUM, enemyAttack, playerAttack};