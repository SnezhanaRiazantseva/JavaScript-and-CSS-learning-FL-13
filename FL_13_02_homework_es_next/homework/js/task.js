//#1
const maxElement = array => Math.max(...array)

const arr = [1, 2, 3, 4 , 56, 7, 8, 76, 5, 241, 5, 356, 567, 2]
// console.log(maxElement(arr))

//#2
const copyArray = (arr) => [...arr]

const array = [1, 2, 3]
const copiedArray = copyArray(array)
// console.log(array, copiedArray)
// console.log(array === copiedArray)

//#3
const addUniqueId = (obj) => {
  const newObj = Object.assign({}, obj)
  const id = Symbol(`id${newObj.name}`)
  newObj.id = id
  return newObj
}

const objTest = {name: 123}
// console.log(addUniqueId(objTest))
// console.log(addUniqueId(objTest) === objTest)

//#4
const oldObj = { name: 'Someone', details: { id: 1, age: 11, university: 'UNI'} }

const regroupObj = (obj) => {
  const {details: { university : university }, 
        details: { age: age},
        name: firstName,
        details: { id : id} } = obj

  const destructed = {
    university,
    user: {
      age,
      firstName,
      id
    }
  }
  return destructed
}
// console.log(regroupObj(oldObj))

//#5
const findIniqueElements = (array) => [...new Set(array)]

const arrayTestUnique = [1, 1, 23, 3, 4, 5, 6, 5, 4, 23, 2, 1, 1, 1, 1, 1]
// console.log(findIniqueElements(arrayTestUnique))

//#6
const phoneNumber = '0123456789'

const hideNumber = (number) => number.slice(-4).padStart(number.length, '*')

// console.log(hideNumber(phoneNumber))

//#7
const add = (a = (required)(), b = (required)()) => a + b

const required = () => { throw 'Error: Missed property' }

// console.log(add(1, 3))
// console.log(add(1))

//#8
let urlGit = 'https://api.github.com/users/monsisome/repos'
let urlUsers = 'https://jsonplaceholder.typicode.com/users'

function fetchArray(url) {
  return new Promise(function resolve() {
    // const fetch = require("node-fetch");
    fetch(url, {
        method: "GET",
        headers: {"Content-Type": "text/plain;charset=UTF-8"}
    }).then(request => request.json())
      .then(request => {
        console.log(request.map(repo => repo.name).sort((a, b) => a.localeCompare(b)))
      })
  })
}

// fetchArray(urlUsers)

//#9
async function fetchAsyncArray(url) {
  try {
    // const fetch = require("node-fetch");
    const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "text/plain;charset=UTF-8"
        }
      })
    const requestArray = await response.json()

    return console.log(requestArray.map(repo => repo.name).sort((a, b) => a.localeCompare(b)))
  }
  catch (error) {
    console.log('Error')
  }
}

// fetchAsyncArray(urlGit)
