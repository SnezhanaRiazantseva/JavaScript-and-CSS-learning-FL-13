import { varietyofResults } from '../index';

export function getResults(lastPersonChoice, lastRandomChoice) {
  return varietyofResults[lastPersonChoice + lastRandomChoice];
}
