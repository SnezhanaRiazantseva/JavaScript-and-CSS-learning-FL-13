import { gameBase } from '../index';
import { getRandomChoice } from './get_random_choice';
import { getResults } from './get_results';
import { endTheGame } from './end_the_game';
import { renderResults } from './render_results';

export function runTheGame(event) {
  event.preventDefault();
  if (event.target.tagName !== 'BUTTON') {
    return;
  }
  if (gameBase.personChoices.length >= 3) {
    endTheGame();
  }
  if (!gameBase.isGameStarted) {
    gameBase.isGameStarted = true;
  }
  gameBase.personChoices.push(
    event.target.className[0].toUpperCase() + event.target.className.slice(1)
  );
  gameBase.randomChoices.push(getRandomChoice());
  let lastPersonChoice =
    gameBase.personChoices[gameBase.personChoices.length - 1];
  let lastRandomChoice =
    gameBase.randomChoices[gameBase.randomChoices.length - 1];
  let round = gameBase.personChoices.length;
  let result = getResults(lastPersonChoice, lastRandomChoice);
  gameBase.gameResults.push(result);
  let resultFrase = `Round ${round}, ${lastPersonChoice} vs. ${lastRandomChoice}, You've ${result}!`;
  renderResults(resultFrase, round);
  return true;
}
