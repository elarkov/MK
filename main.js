import {Game} from './game.js';

const p1 = await Game.getPlayers();
p1.player = 1;
const p2 = await Game.getRandomPlayer();
p2.player = 2;

const game = new Game({p1, p2});
await game.start();