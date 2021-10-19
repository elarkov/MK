const fighterOne = {
    id: 1,
    className: ['player1', 'js-player-one'],
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [' kori blade', 'shurikens', 'ice bomb'],
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    attack: function() {
        console.log(this.name + 'Fight...')
    }
};

const fighterSecond = {
    id: 2,
    className: ['player2', 'js-player-second'],
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['homura kunai', 'donryu\'s fire', 'hellfire kunai'],
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    attack: function() {
        console.log(this.name + 'Fight...')
    }
};

const arenas = document.querySelector('.arenas');
const randomButton = arenas.querySelector('.button');
const MINNUM = 1;
const MAXNUM = 20;


/**function generates random number from 1 to 20 */
const randomNum = function(minNum, maxNum) {
    const numberRand = Math.floor(Math.random() * (maxNum - minNum) + minNum);
    return numberRand;
};

/**function helper for create DOM*/
function createElement(tagName, className) {
    const tag = document.createElement(tagName);
    
    if(className){
        tag.classList.add(className);
    }

    return tag;
}

/**function creates DOM of fighter on game field */
const createPlayer = function(fighter) {
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

/**function displays the result of fight */
const showResult = function(name) {
    const resultText = createElement('div', 'winTitle');

    if(name) {
       resultText.innerHTML = `${name} wins!!!`;
    } else {
        resultText.innerHTML = 'Draw!!!';
    }
       
    return resultText;
};


/**function changes  the fighter's lifeprogress */
 function changeHP(num) {
    
    this.hp -= num;
    
    /**if player has points 0 to do it */
     if(this.hp <= 0) {
        this.hp = 0;
    }
};

function elHP() {
    const playerLifeProgress = document.querySelector(`.player${this.id} .life`);
    return playerLifeProgress;
};

function renderHP() {
    const lineProgress = this.elHP();
    const playerLifeScore = document.querySelector(`.player${this.id} .life-score`);

    lineProgress.style.width = this.hp + '%';
    playerLifeScore.innerText = `${this.hp} %`;

    if(this.hp <= 0){
        playerLifeScore.innerText = 0;
        lineProgress.style.cssText = 'padding:0; width:0;';
    }
};

function createReloadButton() {
    const reloadWrap = createElement('div', 'reloadWrap');
    const restartButton = createElement('button', 'button');
    restartButton.innerText = 'Restart';
    reloadWrap.appendChild(restartButton);

    restartButton.addEventListener('click', function() {
        window.location.reload();
    });
    return reloadWrap;
}

randomButton.addEventListener('click', function(){
    fighterOne.changeHP(randomNum(MINNUM, MAXNUM));
    fighterSecond.changeHP(randomNum(MINNUM, MAXNUM));

    fighterOne.elHP();
    fighterSecond.elHP();

    fighterOne.renderHP();
    fighterSecond.renderHP();

    /**when fighters have 0 points the button will disable */
    if(fighterOne.hp === 0 || fighterSecond.hp === 0) {
        randomButton.disabled = true;
        arenas.appendChild(createReloadButton());
    }

    /**if anyone has points 0 and less then opposition side to display name winner */
    if(fighterOne.hp === 0 && fighterOne.hp < fighterSecond.hp) {
        arenas.appendChild(showResult(fighterSecond.name));
    } else if(fighterSecond.hp === 0 && fighterSecond.hp < fighterOne.hp) {
        arenas.appendChild(showResult(fighterOne.name));
    } else if(fighterOne.hp === 0 && fighterSecond.hp === 0) {
        arenas.appendChild(showResult());
    }
});

arenas.appendChild(createPlayer(fighterOne));
arenas.appendChild(createPlayer(fighterSecond));