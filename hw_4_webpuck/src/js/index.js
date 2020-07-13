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
  // let personChoices = [];
  // let randomChoices = [];
  personChoices.push(event.target.className);

  console.log(event.target.className);
}

let buttons = document.getElementsByClassName('button-wrapper')[0];
buttons.addEventListener('click', run);

function endTheGame() {
  isGameStarted = false;
}