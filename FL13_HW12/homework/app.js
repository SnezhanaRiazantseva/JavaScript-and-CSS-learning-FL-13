const INITIAL_COUNT_OF_SET = 3;
const BEFORE_LAST_ITEM = 2;
const NOT_FOUND = -1;
const TIMER_300 = 300;
const INDEX_2 = 2;
const INDEX_3 = 3;

window.addEventListener('popstate', function(event) {
  updateState(event.state);
});

window.addEventListener('load', function (event) {
  if (!checkLink()) {
    event.preventDefault();
    return;
  }
  const state = { page: window.location.href };
  history.pushState(state, '', state.page);
  updateState(state);
  event.preventDefault();
});

window.addEventListener('hashchange', function (event) {
  if (!checkLink()) {
    event.preventDefault();
    return;
  }
  const state = {
    page: window.location.href
  };
  history.pushState(state, '', state.page);
  updateState(state);
  event.preventDefault();
});

const booksFromStorage = localStorage.getItem('allBooks');
const booksDataSet = JSON.parse(booksFromStorage);

let newIdentifier;

function setIdentifier() {
  let countIdentifier;
  if (booksDataSet.length === INITIAL_COUNT_OF_SET) {
    countIdentifier = 0;
  } else {
    countIdentifier = booksDataSet[booksDataSet.length - BEFORE_LAST_ITEM]['uid'];
  }
  for (let identifier of booksDataSet) {
    if (!identifier['uid']) {
      identifier['uid'] = ++countIdentifier;
      newIdentifier = identifier['uid'];
    }
  }
}

setIdentifier();

const root = document.getElementById('root');

const staticPage = document.createElement('section');
staticPage.classList.add('static-page');
staticPage.classList.add('set-page');
const staticHeader = document.createElement('h1');
staticHeader.innerHTML = 'Set of books';
staticPage.append(staticHeader);

const dynamicPage = document.createElement('section');
dynamicPage.classList.add('dynamic-page');

root.append(staticPage);
root.append(dynamicPage);

function createSetPage(container, arr) {
  container.insertAdjacentHTML('beforeend', createHtmlSetPage(arr));
}

function createHtmlSetPage(arr) {
  let li = '';
  let ul;
  for (let key of arr) {
    li += `<li><a href="?id={${key['uid']}}#preview" class="bookItem">${key['bookName']}</a>
    <a href="?id={${key['uid']}}#edit" class="edit-book">Edit</a></li>`;
  }
  if (li) {
    ul = `<ul>${li}</ul><a href="${window.location.href.split('html')[0]}html#add" class="add-book">Add</a>`;
  }
  return ul || '';
}

createSetPage(staticPage, booksDataSet);

const routingPages = {
  'preview': createPreviewPage,
  'edit': createEditPage,
  'add': createAddPage
}

let currentId;

function createPreviewPage() {
  let html;
  for (let book of booksDataSet) {
    if (book['uid'] === currentId) {
      html = `<article class="book-preview"><div><img src="${book['bookImg']}"></div><div><h1>${book['bookName']}</h1>
      <adress>${book['bookAuthor']}</adress><p>${book['bookPlot']}</p></div></article>`;
      break;
    }
  }
  dynamicPage.insertAdjacentHTML('beforeend', html);
}

function createEditPage() {
  let choosenBook = currentId;
  for (let i = 0; i < booksDataSet.length; i++) {
    if (booksDataSet[i]['uid'] === currentId) {
      choosenBook = i;
      break;
    }
  }

  let html;
  html = `<h1 class="containerHeader">Edit book</h1><form>
  <input type="text" required value="${booksDataSet[choosenBook]['bookName']}" placeholder="Book's name">
  <input type="text" required value="${booksDataSet[choosenBook]['bookAuthor']}" placeholder="Author's name">
  <input type="text" required value="${booksDataSet[choosenBook]['bookImg']}" placeholder="Book's img url">
  <textarea rows="9" required placeholder="Book's Plot">${booksDataSet[choosenBook]['bookPlot']}</textarea>
  <input type="submit" class="save-book" name="save" value="Save">
  <input type="submit" class="cancel-book" name="cancel" value="Cancel"></form>`;
  dynamicPage.insertAdjacentHTML('beforeend', html);

  const formCollection = document.querySelector('form');
  formCollection.addEventListener('submit', executeAction);

  function executeAction(e) {
    event.preventDefault();
    if (event.submitter.defaultValue === 'Cancel') {
      const discard = confirm('Discard changes?');
      if (discard) {
        history.back();
        updateState();
      }
    } else {
      doEdit(e);
    }
  }

  function doEdit() {
    booksDataSet[choosenBook]['bookName'] = formCollection[0].value;
    booksDataSet[choosenBook]['bookAuthor'] = formCollection[1].value;
    booksDataSet[choosenBook]['bookImg'] = formCollection[INDEX_2].value;
    booksDataSet[choosenBook]['bookAPlot'] = formCollection[INDEX_3].value;

    localStorage.setItem('allBooks', JSON.stringify(booksDataSet));

    let allBooks = staticPage.getElementsByClassName('bookItem');
    for (let editedBook of allBooks) {
      if (editedBook.href.indexOf(`?id={${booksDataSet[choosenBook]['uid']}}`) !== NOT_FOUND) {
        const state = { page: editedBook.getAttribute('href') };
        history.pushState(state, '', state.page);
        updateState(state);
        break;
      }
    }
    setTimeout(() => alert('Book successfully updated'), TIMER_300);
  }
}

function createAddPage() {
  let html;
  html = `<h1 class="containerHeader">Add new book</h1><form><input type="text" required value="" 
  placeholder="Book's name"><input type="text" required value="" placeholder="Author's name">
  <input type="text" required value="" placeholder="Book's img url">
  <textarea rows="9" required value="" placeholder="Book's Plot"></textarea>
  <input type="submit" class="add-book" name="add" value="Add">
  <input type="submit" class="cancel-book" name="cancel" value="Cancel"></form>`;
  dynamicPage.insertAdjacentHTML('beforeend', html);
  const formCollection = document.querySelector('form');
  formCollection.addEventListener('submit', executeAction);

  function executeAction(e) {
    if (event.submitter.defaultValue === 'Cancel') {
      const discard = confirm('Discard changes?');
      if (discard) {
        history.back();
        updateState();
      }
    } else {
      doChanges(e);
    }
     event.preventDefault();
  }

  function doChanges() {
    const arrOfValues = {
      'bookName': formCollection[0].value,
      'bookAuthor': formCollection[1].value,
      'bookImg': formCollection[INDEX_2].value,
      'bookPlot': formCollection[INDEX_3].value,
      'uid': ''
    }
    booksDataSet.push(arrOfValues);
    setIdentifier();
    localStorage.setItem('allBooks', JSON.stringify(booksDataSet));

    const newHref = booksDataSet[booksDataSet.length - 1]['uid'];
    addBookItem();
    
    let allBooks = staticPage.getElementsByClassName('bookItem');
    for (let editedBook of allBooks) {
      if (editedBook.href.indexOf(`?id={${newHref}}`) !== NOT_FOUND) {
        const state = { page: editedBook.getAttribute('href') };
        history.pushState(state, '', state.page);
        updateState(state);
        break;
      }
    }
    setTimeout(() => alert('Book successfully added'), TIMER_300);
  }
}

function updateState() {
  const content = routingPages[location.hash.slice(1)];
  if (content !== undefined) {
    dynamicPage.innerHTML = '';
    if (content !== createAddPage) {
      getUid();
    }
    content();
  }
}

function checkLink() {
  const initialUrl = location.origin + location.pathname;
  let allLinks = document.getElementsByTagName('a');
  const arr = [];
  
  for (let link of allLinks) {
    const personalHref = link.href;
    if (personalHref === location.href) {
      arr.push('true');
      break;
    }
  }

  if (arr.length === 0) {
    dynamicPage.innerHTML = '';
    history.pushState(initialUrl, '', initialUrl);
    return false;
  }
  return true;
}

function executeClick(event) {
  let state;
  if (event.target.tagName !== 'A') {
    return;
  }
  state = { page: event.target.getAttribute('href') };
  history.pushState(state, '', state.page);
  updateState(state);
  event.preventDefault();
}

let allBooks = staticPage.getElementsByClassName('bookItem');
for (let book of allBooks) {
  book.addEventListener('click', executeClick);
}

let allEdits = staticPage.getElementsByClassName('edit-book');
for (let edit of allEdits) {
  edit.addEventListener('click', executeClick);
}

let addButton = staticPage.getElementsByClassName('add-book')[0];
addButton.addEventListener('click', executeClick);

function getUid() {
  const regExp = /\d+(?=})/;
  const idClicked = window.location.href.match(regExp)[0];
  currentId = parseInt(idClicked, 10);
}

function addBookItem() {
  staticPage.getElementsByTagName('ul')[0].insertAdjacentHTML('beforeend', `<li>
  <a href="?id={${booksDataSet[booksDataSet.length - 1]['uid']}}#preview" 
  class="bookItem">${booksDataSet[booksDataSet.length - 1]['bookName']}</a>
  <a href="?id={${booksDataSet[booksDataSet.length - 1]['uid']}}#edit" class="edit-book">Edit</a></li>`);
}