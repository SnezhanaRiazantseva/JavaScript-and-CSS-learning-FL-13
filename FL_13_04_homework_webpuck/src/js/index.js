import '../scss/styles.scss';
import '../scss/typography.scss';
import { runTheGame } from './utils/run_the_game';
import { endTheGame } from './utils/end_the_game';

export const gameBase = {
  isGameStarted: false,
  personChoices: [],
  randomChoices: [],
  gameResults: [],
};
export const allChoices = ['Rock', 'Paper', 'Scissors'];

export const varietyofResults = {
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
export let hr = document.getElementsByTagName('HR')[0];

const buttons = document.querySelector('.button-wrapper');
buttons.addEventListener('click', runTheGame);
let reset = document.getElementsByClassName('reset')[0];
reset.addEventListener('click', endTheGame);
