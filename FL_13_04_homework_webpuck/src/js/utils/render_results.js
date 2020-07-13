import { hr } from '../index';
import { countGameResults } from './count_game_results';

export function renderResults(frase, round) {
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
