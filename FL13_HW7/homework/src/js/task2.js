let answer = confirm('Do you want to play a game?')
let willContinue
let playerNumber
let winningNumber

const INITIAL_MAX_RANDOM = 6
const RANDOM_GROW = 5
let maxRandom = INITIAL_MAX_RANDOM
const ATTEMPTS = 3
const INITIAL_PRIZE = 100
let prize = INITIAL_PRIZE
let maxGamePrize
const BY_TWO_TIMES = 2
const INITIAL_TOTAL_PRIZE = 0
let totalPrize = INITIAL_TOTAL_PRIZE

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

playingGame:
while(answer) {
  let games = 1
  totalPrize = INITIAL_TOTAL_PRIZE
  prize = INITIAL_PRIZE
  maxRandom = INITIAL_MAX_RANDOM
  gameCount:
  while( games > 0 ) {
    winningNumber = null
    winningNumber = getRandomInt(maxRandom)
    maxGamePrize = prize
    gameAttempts:
    for(let attempt = ATTEMPTS; attempt > 0; attempt--) {
      playerNumber = null
      playerNumber = prompt(`Choose a roulette pocket number from 0 to ${maxRandom - 1}
Attempts left: ${attempt}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${prize}$`)
      if(playerNumber !== null) {
        playerNumber = Number(playerNumber)
      }
      if(playerNumber === winningNumber) {
        totalPrize += prize
        willContinue = confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`)
        if(!willContinue) {
          alert(`Thank you for your participation. Your prize is: ${totalPrize}$`)
          answer = confirm('Do you want to play again?')
          if(!answer) {
            break playingGame
          }
          break gameCount
        }
        break gameAttempts
      } else if (playerNumber !== winningNumber && attempt === 1) {
        alert(`Thank you for your participation. Your prize is: ${totalPrize}$`)
        answer = confirm('Do you want to play again?')
        if(!answer) {
          break playingGame
        }
        break gameCount
      } else {
      prize /= BY_TWO_TIMES
      }
    }
    prize = maxGamePrize * BY_TWO_TIMES
    maxRandom += RANDOM_GROW
    games++
  }
}

alert('You did not become a billionaire, but can.')
