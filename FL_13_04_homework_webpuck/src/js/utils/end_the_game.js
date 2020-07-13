import { gameBase } from '../index';
import { renderDeletedResults } from './render_deleted_results';

export function endTheGame(event) {
  if (event) {
    event.preventDefault();
  }
  renderDeletedResults();
  gameBase.isGameStarted = false;
  gameBase.personChoices = [];
  gameBase.randomChoices = [];
  gameBase.gameResults = [];
}
