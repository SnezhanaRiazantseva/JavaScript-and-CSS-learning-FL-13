function isBigger(a, b) {
  return a > b
}

function getDifference(firstArg, secondArg) {
  return isBigger(firstArg, secondArg) ? (firstArg - secondArg) : (secondArg - firstArg)
}

getDifference(5, 3)
getDifference(5, 8)