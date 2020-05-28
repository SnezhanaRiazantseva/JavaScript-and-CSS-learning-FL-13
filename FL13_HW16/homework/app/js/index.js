window.addEventListener('load', function () {
  getInitialUsers();
});

const INDEX_TWO = 2;
const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

const header = `<h1>Manage User App</h1>`;
appContainer.insertAdjacentHTML('afterbegin', header);

const promptForm = `<form name="addUsers"><input type="text" required placeholder="Name">
<input type="text" required placeholder="Username">
<input type="submit" value="Add New User"></form>`;
appContainer.insertAdjacentHTML('beforeend', promptForm);
const addUsersForm = document.forms.addUsers;
addUsersForm.addEventListener('submit', addNewUser);
const addUsersButton = addUsersForm.querySelector('input[type="submit"]');

const divForUsersList = document.createElement('div');
divForUsersList.classList.add('usersListBlock');
appContainer.insertAdjacentElement('beforeend', divForUsersList);

appContainer.insertAdjacentHTML('beforeend', '<div class="loading">Loading...</div>');
const loadElement = document.querySelector('.loading');

const sendHttpRequest = (method, url, data) => {
  const promise = new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('progress', updateProgress);

    xhr.open(method, url);

    xhr.responseType = 'json';

    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    }
    if (method === 'DELETE') {
      xhr.setRequestHeader('Authorization', 'admin');
    }

    function updateProgress(event) {
      loadElement.hidden = event.loaded === event.total;
    }

    xhr.onload = function () {
      resolve(xhr.response);
    }
    
    xhr.send(JSON.stringify(data));
  });
  return promise;
}

function getInitialUsers() {
  sendHttpRequest('GET', 'http://localhost:3000/users')
    .then(responseData => {
      createUsersInList(divForUsersList, responseData);
    });
}

function addNewUser(e) {
  e.preventDefault();
  addUsersButton.disabled = true;

  sendHttpRequest('POST', 'http://localhost:3000/users', {
    name: addUsersForm[0].value,
    username: addUsersForm[1].value
  })
    .then(sendHttpRequest('GET', 'http://localhost:3000/users')
      .then(responseData => {
        pushToUserList(responseData[responseData.length - 1]);
        addUsersButton.disabled = false;
        e.target.children[0].value = '';
        e.target.children[1].value = '';
        e.target.children[0].blur();
        e.target.children[1].blur();
      }));
}

function createUsersInList(container, arr) {
  container.insertAdjacentHTML('beforeend', createHtmlUsersInList(arr));
}

function createHtmlUsersInList(arr) {
  let li = '';
  let ul;
  for (let key of arr) {
    li += makeLiElement(key);
  }
  if (li) {
    ul = `<ul>${li}</ul>`;
  }
  return ul || '';
}

function pushToUserList(newUser) {
  const ul = document.querySelector('ul');
  const li = makeLiElement(newUser);
  ul.insertAdjacentHTML('beforeend', li);
}

function makeLiElement(user) {
  return `<li>
    <input class="uid" value="${user['id']}" disabled></input>
    <input type="text" value="${user['name']}"></input>
    <input type="text" value="${user['username']}"></input>
    <button class="update-user" onclick="executeUpdate(event)">Update</button>
    <button class="delete-user" onclick="executeDelete(event)">Delete</button></li>`;
}

function executeUpdate(event) {
  event.preventDefault();
  if (event.target.tagName !== 'BUTTON') {
    return;
  }

  for (let elem of event.target.parentElement.children) {
    if (elem.tagName === 'INPUT' && !elem.classList.contains('uid') || elem.tagName === 'BUTTON') {
      elem.disabled = true;
    }
  }
  
  sendHttpRequest('PUT', `http://localhost:3000/users/${event.target.parentElement.firstElementChild.value}`, {
      name: event.target.parentElement.children[1].value,
      username: event.target.parentElement.children[INDEX_TWO].value
    })
    .then(() => {
      for (let elem of event.target.parentElement.children) {
        if (elem.tagName === 'INPUT' && !elem.classList.contains('uid') || elem.tagName === 'BUTTON') {
          elem.disabled = false;
        }
      }
    });
}

function executeDelete(event) {
  event.preventDefault();
  if (event.target.tagName !== 'BUTTON') {
    return;
  }

  for (let elem of event.target.parentElement.children) {
    if (elem.tagName === 'INPUT' && !elem.classList.contains('uid') || elem.tagName === 'BUTTON') {
      elem.disabled = true;
    }
  }

  sendHttpRequest('DELETE', `http://localhost:3000/users/${event.target.parentElement.firstElementChild.value}`)
    .then(() => {
      event.target.parentElement.hidden = true;
    });
}