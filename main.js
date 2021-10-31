import {Game} from './game.js';
import { randomNum } from "./util.js";

const players = await Game.getPlayers();
const p1 = players[randomNum(0, players.length)];
p1.player = 1;
const p2 = await Game.getRandomPlayer();
// const p2 = players[randomNum(0, players.length)];
p2.player = 2;

const game = new Game({p1, p2});
await game.start();