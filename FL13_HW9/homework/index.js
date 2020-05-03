function convert(...arrToConvert) {
  const convertedArr = []

  for (let i = 0; i < [...arrToConvert].length; i++) {
    if (typeof [...arrToConvert][i] === 'string') {
      convertedArr[i] = Number([...arrToConvert][i])
    } else {
      convertedArr[i] = String([...arrToConvert][i])
    }
  }

  return convertedArr
}

function executeforEach(arrForEach, callbackForEach) {
  for (let i = 0; i < arrForEach.length; i++) {
    callbackForEach( arrForEach[i], i, arrForEach );
  }
}

function mapArray(arrMap, callbackMap) {
  const mappedArray = [];

  executeforEach(arrMap, elem => {
    if (typeof elem === 'string') {
      mappedArray.push(callbackMap(Number(elem)))
    } else {
      mappedArray.push(callbackMap(elem))
    }
  })

  return mappedArray
}

function filterArray(arrFilter, callbackFilter) {
  const filteredArray = []

  executeforEach(arrFilter, elem => {
    if (callbackFilter(elem)) {
      filteredArray.push(elem);
    }
  })

  return filteredArray
}

function containsValue(arrFind, valueToFind) {
  let arrContains = false

  executeforEach(arrFind, elem => {
    if (elem === valueToFind) {
      arrContains = true
    }
  })

  return arrContains
}

function flipOver(someStr) {
  let reversedStr = ''

  for (let letterIndex = someStr.length - 1; letterIndex >= 0; letterIndex--) {
    reversedStr += someStr[letterIndex]
  }

  return reversedStr
}

function makeListFromRange(arrRange) {
  const rangedArr = []

  if (arrRange[0] > arrRange[1]) {
    for (let i = arrRange[1]; i <= arrRange[0]; i++) {
      rangedArr.push(i);
    }
  } else { 
    for (let i = arrRange[0]; i <= arrRange[1]; i++) {
      rangedArr.push(i);
    }
  }

  return rangedArr
}

function getArrayOfKeys(arrayForObjects, keyForArr) {
  const arrayByKey = []

  executeforEach(arrayForObjects, function(obj) {
    for (let key in obj) {
      if (key === keyForArr) {
        arrayByKey.push(obj[key])
      }
    }
  })

  return arrayByKey
}

function substitute(arrayToSubstitute) {
  const resultOfSubstitute = []
  const MIN_NUM = 10;
  const MAX_NUM = 20

  mapArray(arrayToSubstitute, function(item) {
    if (item > MIN_NUM && item < MAX_NUM) {
      resultOfSubstitute.push('*')
    } else {
      resultOfSubstitute.push(item)
    }
    return item
  })

  return resultOfSubstitute
}

function getPastDay(dateToChange, days) {
  const dateCopy = new Date(dateToChange);
  
  dateCopy.setDate(dateToChange.getDate() - days);

  return dateCopy.getDate()
}

const ZERO_BEFORE_NUM = 10
const countDateDigits = dateToDigit => dateToDigit < ZERO_BEFORE_NUM ? '0' + dateToDigit : dateToDigit;

function formatDate(dateToFormat) {
  const year = dateToFormat.getFullYear();
  const month = countDateDigits(dateToFormat.getMonth() + 1);
  const dayOfMonth = countDateDigits(dateToFormat.getDate());
  const hour = countDateDigits(dateToFormat.getHours());
  const minutes = countDateDigits(dateToFormat.getMinutes());

  return `"${year}/${month}/${dayOfMonth} ${hour}:${minutes}"`
}