let user = prompt('Enter your login')
let promptedPassword
const minLength = 4
const eveningpoint = 20
const daypoint = 8
let currentHours = new Date().getHours()
let users = {
  'User': 'UserPass',
  'Admin': 'RootPass'
}

if(!user) {
  alert('Canceled.')
} else if(user.length < minLength) {
  alert('I don\'t know any users having name length less than 4 symbols')
} else if(users.hasOwnProperty(user)) {
  promptedPassword = prompt('Enter your password')
  if(!promptedPassword) {
    alert('Canceled.')
  } else if(promptedPassword === users[user]) {
    if(currentHours < eveningpoint && currentHours > daypoint) {
      alert(`Good day, dear ${user}!`)
    } else {
      alert(`Good evening, dear ${user}!`)
    }
  } else {
    alert('Wrong password')
  }
} else {
    alert('I don’t know you')
}
