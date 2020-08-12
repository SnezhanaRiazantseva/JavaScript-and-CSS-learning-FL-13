import {
  colorPalete,
  warningCriterion,
  twoWarningCriterion,
  pageHeader,
} from '../../index';
import getAverageUnitSalary from '../../utils/getAverageUnitSalary';
import getAverageUnitPerfomance from '../../utils/getAverageUnitPerfomance';

let iForColors;

export default function createWarningTree(container, obj) {
  if (Object.entries(obj).length === 0 && obj.constructor === Object) {
    document.getElementsByClassName('Unitroot')[0].innerHTML =
      'The organization has no employees matching these filters.';
    return;
  }
  pageHeader.innerHTML = 'Warning Employees Tree';
  let colorPaleteLength = colorPalete.length;
  iForColors = colorPaleteLength - 1;
  container.innerHTML =
    '<p class="summary">Employees with low perfomance and too high salary:</p>' +
    createWarningTreeText(obj);
}

function createWarningTreeText(node, averageSalary, averagePerfomanceData) {
  let li = '';
  let ul;
  if (node.hasChildren()) {
    li += `<p><strong>${node.pool_name}</strong></p>`;
    averageSalary = getAverageUnitSalary(node, node.children.length + 1);
    averagePerfomanceData = getAverageUnitPerfomance(node);
    if (
      warningCriterion.chooseEmployees(node, averageSalary) &&
      twoWarningCriterion.chooseEmployees(node)
    ) {
      li += `<li><strong>${node.name}</strong></li>`;
    }
    for (let i = 0, len = node.children.length; i < len; i++) {
      // eslint-disable-next-line prettier/prettier
      li += createWarningTreeText(node.getChild(i), averageSalary, averagePerfomanceData);
    }
    ul = `<ul class="warningUlItem" style="background-color: ${colorPalete[iForColors]};">${li}</ul>`;
  } else {
    if (
      warningCriterion.chooseEmployees(node, averageSalary) &&
      twoWarningCriterion.chooseEmployees(node)
    ) {
      li += `<li>${node.name}</li>`;
    }
    return li;
  }
  iForColors -= 1;
  return ul || '';
}
