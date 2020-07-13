import '../scss/styles.scss';
import '../scss/typography.scss';

let isGameStarted = false;
// import { AlertService } from "./app/alert.service";
// import { ComponentService } from "./app/component.service";
// const alertService = new AlertService();
// const componentService = new ComponentService();
// run(alertService, componentService);
// class TestClass {
//   constructor() {
//     const msg = 'Using ES2015+ syntax';
//     console.log(msg);
//   }
// }
// const test = new TestClass();
let personChoices = [];
let randomChoices = [];
let allChoices = ['Rock', 'Paper', 'Scissors'];
let gameResults = [];

function run(event) {
  event.preventDefault();
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  if (personChoices.length >= 3) {
    endTheGame();
  }
  if (!isGameStarted) {
    isGameStarted = true;
  }
  personChoices.push(
    event.target.className[0].toUpperCase() + event.target.className.slice(1)
  );
  randomChoices.push(getRandomChoice());
  let lastPersonChoice = personChoices[personChoices.length - 1];
  let lastRandomChoice = randomChoices[randomChoices.length - 1];
  let round = personChoices.length;
  let result = getResults(lastPersonChoice, lastRandomChoice);
  gameResults.push(result);
  let resultFrase = `Round ${round}, ${lastPersonChoice} vs. ${lastRandomChoice}, You've ${result}!`;
  renderResults(resultFrase, round);
}

let buttons = document.getElementsByClassName('button-wrapper')[0];
buttons.addEventListener('click', run);
let reset = document.getElementsByClassName('reset')[0];
reset.addEventListener('click', endTheGame);
let hr = document.getElementsByTagName('HR')[0];

function endTheGame(event) {
  if (event) {
    event.preventDefault();
  }
  renderDeletedResults();
  isGameStarted = false;
  personChoices = [];
  randomChoices = [];
  gameResults = [];
}

function renderDeletedResults() {
  let pastResults = document.querySelectorAll('.round-result');
  for (let pastResult of pastResults) {
    pastResult.remove();
  }
  if (document.querySelector('.game-result')) {
    document.querySelector('.game-result').remove();
  }
}

function getRandomChoice() {
  return allChoices[Math.floor(Math.random() * Math.floor(3))];
}

const varietyofResults = {
  RockRock: 'TIE',
  RockPaper: 'LOST',
  RockScissors: 'WON',
  PaperPaper: 'TIE',
  PaperRock: 'WON',
  PaperScissors: 'LOST',
  ScissorsScissors: 'TIE',
  ScissorsRock: 'LOST',
  ScissorsPaper: 'WON',
};

function getResults(lastPersonChoice, lastRandomChoice) {
  return varietyofResults[lastPersonChoice + lastRandomChoice];
}

function renderResults(frase, round) {
  let roundResult = document.createElement('p');
  roundResult.classList.add('round-result');
  roundResult.innerHTML = frase;
  hr.before(roundResult);
  if (round === 3) {
    let gameResult = document.createElement('h3');
    gameResult.classList.add('game-result');
    gameResult.innerHTML = countGameResults();
    hr.before(gameResult);
  }
}

function countGameResults() {
  let wins = gameResults.reduce((total, result) => {
    if (result === 'WON') {
      total += 1;
    }
    return total;
  }, 0);
  let loses = gameResults.reduce((total, result) => {
    if (result === 'LOST') {
      total += 1;
    }
    return total;
  }, 0);
  if (wins === loses) {
    return 'Game is over with a Draw!';
  } else if (wins > loses) {
    return 'Game is Over. You Won!';
  } else {
    return 'Game is Over. You Lost!';
  }
}
