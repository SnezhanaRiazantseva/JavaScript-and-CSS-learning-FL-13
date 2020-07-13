import { allChoices } from '../index';

export function getRandomChoice() {
  console.log(allChoices[Math.floor(Math.random() * Math.floor(3))]);
  return allChoices[Math.floor(Math.random() * Math.floor(3))];
}
