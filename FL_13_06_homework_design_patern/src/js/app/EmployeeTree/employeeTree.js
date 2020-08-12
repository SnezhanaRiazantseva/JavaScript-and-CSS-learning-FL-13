import { colorPalete, pageHeader } from '../../index';
let iForColors;

export default function createTree(container, obj) {
  if (Object.entries(obj).length === 0 && obj.constructor === Object) {
    document.getElementsByClassName('root')[0].innerHTML =
      'The organization has no employees.';
    return;
  }
  pageHeader.innerHTML = 'Employees Tree';
  let colorPaleteLength = colorPalete.length;
  iForColors = colorPaleteLength - 1;
  container.innerHTML = createTreeText(obj);
}

function createTreeText(node) {
  let li = '';
  let ul;
  li += `<li>`;
  if (node.hasChildren()) {
    li += `<strong>${node.name}</strong><ul>`;
    for (let i = 0, len = node.children.length; i < len; i++) {
      li += createTreeText(node.getChild(i));
    }
    li += `</ul></li>`;

    if (li) {
      ul = `<ul class="ulLevelItem" style="background-color: ${colorPalete[iForColors]};">${li}</ul>`;
    }
  } else {
    li += `${node.name}</li>`;
    return li;
  }
  iForColors -= 1;
  return ul || '';
}
