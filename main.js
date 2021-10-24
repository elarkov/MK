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
const controlForm = document.querySelector('.control');

const MINNUM = 1;
const MAXNUM = 20;
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};


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

arenas.appendChild(createPlayer(fighterOne));
arenas.appendChild(createPlayer(fighterSecond));

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
}

function elHP() {
    const playerLifeProgress = document.querySelector(`.player${this.id} .life`);
    return playerLifeProgress;
}

function renderHP() {
    const lineProgress = this.elHP();
    const playerLifeScore = document.querySelector(`.player${this.id} .life-score`);

    lineProgress.style.width = this.hp + '%';
    playerLifeScore.innerText = `${this.hp} %`;

    if(this.hp <= 0){
        playerLifeScore.innerText = 0;
    }
}

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

function enemyAttack() {
    const hit = ATTACK[randomNum(0, 2)];
    const defence = ATTACK[randomNum(0, 2)];
    
    return {
        value: randomNum(MINNUM, HIT[hit]),
        hit,
        defence
    }
}

function playerAttack() {
    const attack = {};

    for(let item of controlForm) {
        if(item.checked && item.name === 'hit') {
            attack.value = randomNum(MINNUM, HIT[item.value]);
            attack.hit = item.value;
        }

        if(item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

function getResultFight() {
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
  
}

function generateLogs(type, player1, player2) {
    const text = logs[type][randomNum(MINNUM, MAXNUM)].replace('[playerKick]', player1.name);
    console.log(text);
}


controlForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();
   

    if(player.defence !== enemy.hit) {
        fighterOne.changeHP(enemy.value);
        fighterOne.renderHP();
        generateLogs('hit', fighterSecond, fighterOne);
    }

    if(enemy.defence !== player.hit) {
        fighterSecond.changeHP(player.value);
        fighterSecond.renderHP();
    }

    getResultFight();
  

    // console.log('####: Я', attack);
    // console.log('####: Computer', enemy);
});