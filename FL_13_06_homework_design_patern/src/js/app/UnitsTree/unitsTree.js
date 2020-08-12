import { colorPalete, pageHeader } from '../../index';
import getAverageUnitSalary from '../../utils/getAverageUnitSalary';
import getAverageUnitPerfomance from '../../utils/getAverageUnitPerfomance';

let iForColors;

export default function createUnitsTree(container, obj) {
  if (Object.entries(obj).length === 0 && obj.constructor === Object) {
    document.getElementsByClassName('Unitroot')[0].innerHTML =
      'There are no departments in the organization.';
    return;
  }
  pageHeader.innerHTML = 'Units Tree';
  let colorPaleteLength = colorPalete.length;
  iForColors = colorPaleteLength - 1;
  console.log(iForColors);
  container.innerHTML = createUnitsTreeText(obj);
}

function createUnitsTreeText(node) {
  let li = '';
  let ul;
  li += `<li>`;
  if (node.pool_name) {
    li += `<strong>${node.pool_name}</strong>`;

    let unitAmount = node.children.length + 1;
    const averagePerfomanceData = getAverageUnitPerfomance(node);
    const averageUnitSalary = getAverageUnitSalary(node, unitAmount);

    li += `<p>High perfomance: ${averagePerfomanceData.averageHighPerfomance} from ${unitAmount} empoyees.
    Average perfomance: ${averagePerfomanceData.averageAveragePerfomance} from ${unitAmount} empoyees.
    Low perfomance: ${averagePerfomanceData.averageLowPerfomance} from ${unitAmount} unitAmount.
    Unit average perfomance is <b>${averagePerfomanceData.unitAveragePerfomance}</b>.</p>`;
    li += `<p>Average unit salary is <b>${averageUnitSalary}$</b>.</p></li>`;

    for (let i = 0, len = node.children.length; i < len; i++) {
      li += createUnitsTreeText(node.getChild(i));
    }

    ul = `<ul class="ulItem" style="background-color: ${colorPalete[iForColors]};">${li}</ul>`;
    iForColors -= 1;
  }
  return ul || '';
}
