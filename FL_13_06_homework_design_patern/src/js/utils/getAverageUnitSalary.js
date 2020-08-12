export default function getAverageUnitSalary(node, unitAmount) {
  let nodeChildrenSalary = node.children.reduce((amount, employee) => {
    amount += employee.salary;
    return amount;
  }, 0);
  let allSalary = nodeChildrenSalary + node.salary;
  let averageUnitSalary = allSalary / unitAmount;
  return averageUnitSalary.toFixed(2);
}
