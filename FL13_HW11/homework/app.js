const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

function createTree(container, obj) {
  container.innerHTML = createTreeText(obj);
  container.getElementsByTagName('ul')[0].hidden = false;
  container.getElementsByTagName('ul')[0].id = 'baseFolder';
}

function createTreeText(obj) {
  let li = '';
  let ul;
  for (let item of obj) {
    if (item.hasOwnProperty('folder')) {
      li += `<li class="liTree folderItem"><i class="material-icons closed-folder"></i>
      <input value=${item['title']} disabled=true>`;
      if (item['children'] !== null) {
        li += createTreeText(item['children']);
      }
      li += '</li>';
    } else {
      li += `<li class="liTree fileItem"><i class="material-icons file"></i>
      <input value=${item['title']} disabled=true></li>`;
    }
  }
  if (li) {
    ul = '<ul class="ulItem" hidden>' + li + '</ul>';
  }
  return ul || '';
}

createTree(rootNode, data);

const tree = document.getElementById('baseFolder');

tree.onclick = function (event) {
  toggleMenuOF();
  let li = event.target.closest('.liTree');

  if (li === null || li.tagName !== 'LI') {
    return;
  }
  if (event.target.closest('.empty')){
    return;
  }
  if (li.querySelector('i').classList.contains('file')) {
    return;
  }

  const childrenContainer = li.querySelector('ul');

  li.querySelector('i').classList.toggle('closed-folder');
  li.querySelector('i').classList.toggle('open-folder');

  isEmptyFolder(childrenContainer, li);
}

function isEmptyFolder(childrenContainer, li) {
  if (!childrenContainer) {
    const liEmpty = li.closest('ul').querySelector('.empty');
    if (liEmpty) {
      liEmpty.hidden = !liEmpty.hidden;
      return;
    } else {
      return li.insertAdjacentHTML('afterend', '<li class="liTree empty"> Folder is empty </li>');
    }
  } else {
    childrenContainer.hidden = !childrenContainer.hidden;
  }
}

function createContextMenuHTML() {
  const menuHtmlText = `<ul class="context-menu-items"><li class="liContext doEdit">Edit</li>
<li class="liContext doDelete">Delete item</li></ul>`;
  const treeContextMenu = document.createElement('nav');
  treeContextMenu.classList.add('context-menu');
  treeContextMenu.insertAdjacentHTML('afterbegin', menuHtmlText);
  rootNode.append(treeContextMenu);
}
createContextMenuHTML();

const menu = document.querySelector('.context-menu');
let menuState = false;
let active = 'context-menu-active';
let treeItems = document.getElementsByClassName('liTree');
let contextItems = document.getElementsByClassName('liContext');

tree.addEventListener('contextmenu', addContextMenu, false);

function addContextMenu(event) {
  const ul = event.target.closest('#baseFolder');
  const targetElem = event.target.closest('li');
  if (ul.tagName !== 'UL') {
    return;
  }
  event.preventDefault();
  if (event.target.closest('.empty')) {
    return;
  }

  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;
  menu.classList.add('deactivate');
  menu.classList.remove('activate');
  toggleMenuOn(targetElem);
  const li = event.target.closest('.liTree');

  const childrenContainer = li.querySelector('ul');
  if (li) {
    menu.classList.remove('deactivate');
    menu.classList.add('activate');
  }

  const contextDelete = document.getElementsByClassName('doDelete')[0];
  contextDelete.onclick = function () {
    toggleMenuOF();
    targetElem.hidden = true
    if (!li.classList.contains('fileItem')) {
      isEmptyFolder(childrenContainer, li);
    }
  }

  const contextEdit = document.querySelector('.doEdit');
  contextEdit.onclick = function () {
    let inputElem = targetElem.getElementsByTagName('input')[0];
    inputElem.disabled = false;
    toggleMenuOF();

    if (inputElem.closest('li').classList.contains('fileItem')) {
      let selectionEnd = inputElem.value.indexOf('.');
      inputElem.focus();
      inputElem.setSelectionRange(0, selectionEnd);
    } else {
      inputElem.focus();
      inputElem.select();
    }
    
    inputElem.addEventListener('change', () => {
      inputElem.disabled = true;
    });
    inputElem.addEventListener('focusout', () => {
      inputElem.disabled = true
    });
  }
}

function toggleMenuOn(targetHtml) {
  if (menuState === false) {
    menuState = !menuState;
    menu.classList.add(active);
    targetHtml.style.background = '#f0f0f0';
  }
}

function toggleMenuOF() {
  if (menuState === true) {
    menuState = !menuState;
    menu.classList.remove(active);
  }
}

let currentElem = null;

rootNode.onmouseover = function (event) {
  if (currentElem) {
    return;
  }
  let target = event.target.closest('.liTree');
  let targetLi = event.target.closest('li');

  if (!targetLi) {
    return;
  }
  if (!tree.contains(targetLi)) {
    return;
  }

  currentElem = targetLi;
  targetLi.style.background = '#f0f0f0';
  for (let childElem of target.children) {
    if (childElem.tagName === 'I') {
      continue;
    }
    if (childElem.tagName === 'INPUT') {
      continue;
    }
    childElem.style.background = 'white';
  }
}

rootNode.onmouseout = function () {
  if (!currentElem) {
    return;
  }
  currentElem.style.background = '';
  currentElem = null;
}