function countPoints(scores) {
  return scores.reduce((totalScore, gameScores) => {
    if (gameScores[0] === gameScores[2]) {
      totalScore++
    } else if (gameScores[0] > gameScores[2]) {
      totalScore += 3
    }
    return totalScore
  } ,0)
}

countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0'])
countPoints(['1:1', '1:2', '2:0', '4:2', '0:1', '2:3', '1:1', '0:1', '1:1', '3:0'])