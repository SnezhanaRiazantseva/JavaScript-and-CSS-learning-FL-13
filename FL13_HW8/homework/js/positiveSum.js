let positiveSum = (listOfNumbers) => { 
  return listOfNumbers
    .reduce((totalSum, num) => (num > 0) ? totalSum + num : totalSum, 0)
}

positiveSum([2, 4, 6, 8])
positiveSum([0, -3, 5, 7])