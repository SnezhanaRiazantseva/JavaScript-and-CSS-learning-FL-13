import { gameBase } from '../index';

export function countGameResults() {
  let wins = gameBase.gameResults.reduce((total, result) => {
    if (result === 'WON') {
      total += 1;
    }
    return total;
  }, 0);
  let loses = gameBase.gameResults.reduce((total, result) => {
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
