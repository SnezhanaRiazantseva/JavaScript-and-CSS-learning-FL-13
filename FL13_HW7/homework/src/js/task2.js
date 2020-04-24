let answer = confirm('Do you want to play a game?')
let initialMaxRandom = 6
let maxRandom = initialMaxRandom
let randomGrow = 5
let attempts = 3
let initialPrize = 100
let prize = initialPrize
let maxGamePrize
let initialTotalPrize = 0
let totalPrize = initialTotalPrize
let playerNumber
let winningNumber
let double = 2
let willContinue
let playAgain
let quiteGame = -1

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

if(answer) {
  let games = 1;
  while( games > 0 ) {
    winningNumber = getRandomInt(maxRandom)
    maxGamePrize = prize
    for(let attempt = attempts; attempt > 0; attempt--) {
      playerNumber = prompt(`Choose a roulette pocket number from 0 to ${maxRandom - 1}
Attempts left: ${attempt}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${prize}$`)
      if(playerNumber !== null) {
        playerNumber = Number(playerNumber)
      }
      if(playerNumber === winningNumber) {
        totalPrize += prize
        attempt = 1
        willContinue = confirm(`Congratulation, you won! Your prize is: ${prize}$. Do you want to continue?`)
        if(!willContinue) {
          alert(`Thank you for your participation. Your prize is: ${totalPrize}$`)
          playAgain = confirm('Do you want to play again?')
          if(playAgain) {
            games = 0
          } else {
            games = quiteGame
            alert('You did not become a billionaire, but can.')
          }
        }
      } else if (playerNumber !== winningNumber && attempt === 1) {
        attempt = 1
        alert(`Thank you for your participation. Your prize is: ${totalPrize}$`)
        playAgain = confirm('Do you want to play again?')
        if(playAgain) {
          games = 0
        } else {
          games = quiteGame
          alert('You did not become a billionaire, but can.')
        }
      } else {
      prize /= double
      }
      playerNumber = null
    }
    if(games === quiteGame) {
      break
    } else if(games === 0) {
      totalPrize = initialTotalPrize
      prize = initialPrize
      maxRandom = initialMaxRandom
      winningNumber = null
    } else {
      prize = maxGamePrize * double
      maxRandom += randomGrow
      winningNumber = null
    }
    games++
  }
} else {
  alert('You did not become a billionaire, but can.')
}
