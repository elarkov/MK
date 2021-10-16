const fighterOne = {
    className: ['player1', 'js-player-one'],
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [' kori blade', 'shurikens', 'ice bomb'],
    attack: function() {
        console.log(this.name + 'Fight...')
    }
};

const fighterSecond = {
    className: ['player2', 'js-player-second'],
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['homura kunai', 'donryu\'s fire', 'hellfire kunai'],
    attack: function() {
        console.log(this.name + 'Fight...')
    }
};

const arenas = document.querySelector('.arenas');
const randomButton = arenas.querySelector('.button');
const MINNUM = 1;
const MAXNUM = 20;

const randomNum = (minNum, maxNum) => {
    const numberRand = Math.floor(Math.random() * (maxNum - minNum) + minNum);
    return numberRand;
};

function createElement(tagName, className) {
    const tag = document.createElement(tagName);
    
    if(className){
        tag.classList.add(className);
    }

    return tag;
}

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

const displayWinner = (name) => {
    const winText = createElement('div', 'winTitle');
    winText.innerText = `${name} wins!!!`;
       
    return winText;

};

const displayDraw = () => {
    const winText = createElement('div', 'winTitle');
    winText.innerText = 'No winner in this fight!';;
    return winText;
};

const changeHP = (player) => {
    const playerLifeProgress = document.querySelector(`.${player.className[0]} .life`);
    const playerLifeScore = document.querySelector(`.${player.className[0]} .life-score`);
    player.hp -= randomNum(MINNUM, MAXNUM);
    
    playerLifeProgress.style.width =  player.hp + '%';
    playerLifeScore.innerText = `${+player.hp} %`;
     if(player.hp <= 5) {
        playerLifeScore.innerText = 0;
        playerLifeProgress.style.cssText = "padding:0; width:0;";
        randomButton.style.display = 'none';
        getNameWinner(fighterOne, fighterSecond);
    }
};

function getNameWinner(playerOne, playerSecond) {
    if(playerOne.hp > playerSecond.hp) {
        arenas.appendChild(displayWinner(playerOne.name));
    } else if(playerOne.hp < playerSecond.hp) {
        arenas.appendChild(displayWinner(playerSecond.name));
    } else if(playerOne.hp <= 5 && playerSecond.hp <= 5) {
        arenas.appendChild(displayDraw());
    }
}


randomButton.addEventListener('click', () => {
    changeHP(fighterOne);
    changeHP(fighterSecond);
});

arenas.appendChild(createPlayer(fighterOne));
arenas.appendChild(createPlayer(fighterSecond));