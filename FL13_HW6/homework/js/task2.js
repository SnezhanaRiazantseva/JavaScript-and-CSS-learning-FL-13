let value = prompt('Prompt some world')
let middleCharacter
let parity = 2
let half = 2

if(value && value.trim()) {
  if(value.length % parity === 0) {
    middleCharacter = value.length / half
    alert(value.slice(middleCharacter - 1, middleCharacter + 1))
  } else {
    middleCharacter = Math.trunc(value.length / half)
    alert(value.slice(middleCharacter , middleCharacter + 1))
  }
} else {
  alert('Invalid input data')
}
