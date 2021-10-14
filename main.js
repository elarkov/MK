const fighterOne = {
    className: ['player1', 'js-subzero'],
    name: 'Subzero',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [' kori blade', 'shurikens', 'ice bomb'],
    attack: function() {
        console.log(fighterOne.name + 'Fight...')
    }
};

const fighterSecond = {
    className: ['player2', 'js-scorpion'],
    name: 'Scorpion',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['homura kunai', 'donryu\'s fire', 'hellfire kunai'],
    attack: function() {
        console.log(fighterSecond.name + 'Fight...')
    }
};

const arenas = document.querySelector('.arenas');
const createPlayer = (fighter) => {
    const player = document.createElement('div');
    player.className = fighter.className.join(' ');

    const progressBar = document.createElement('div');
    progressBar.classList.add('progressbar');

    const character = document.createElement('div');
    character.classList.add('character');

    const life = document.createElement('div');
    life.classList.add('life');

    life.style.width = fighter.hp + '%';
    const lifeScore = document.createElement('div');
    lifeScore.classList.add('life-score');
    lifeScore.innerText = fighter.hp;
    progressBar.appendChild(lifeScore);


    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = fighter.name; 

    const img = document.createElement('img');
    img.src = fighter.img;
    character.appendChild(img);

    player.appendChild(progressBar);
    player.appendChild(character);
    progressBar.appendChild(life);
    progressBar.appendChild(name);
    arenas.appendChild(player);

};

createPlayer(fighterOne);
createPlayer(fighterSecond);