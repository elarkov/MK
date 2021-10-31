/**function generates random number from 1 to 20 */
const randomNum = (minNum, maxNum) => {
  const numberRand = Math.floor(Math.random() * (maxNum - minNum) + minNum);
  return numberRand;
};

/**function helper for create DOM*/
const createElement = (tagName, className) => {
  const tag = document.createElement(tagName);

  if (className) {
    tag.classList.add(className);
  }

  return tag;
}

const createReloadButton = () => {
  const reloadWrap = createElement('div', 'reloadWrap');
  const restartButton = createElement('button', 'button');
  restartButton.innerText = 'Restart';
  reloadWrap.appendChild(restartButton);

  restartButton.addEventListener('click', function () {
    window.location.href = './index.html';
  });

  return reloadWrap;
}

export {randomNum, createElement, createReloadButton};