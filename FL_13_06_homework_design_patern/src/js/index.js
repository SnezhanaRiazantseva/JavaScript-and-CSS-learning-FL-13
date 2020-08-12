import '../scss/styles.scss';
import '../scss/typography.scss';
import createTree from './app/EmployeeTree/employeeTree';
import createUnitsTree from './app/UnitsTree/unitsTree';
import createWarningTree from './app/WraningTree/wraningTree';

window.addEventListener('load', function () {
  getInitialUsers();
});

function getInitialUsers() {
  fetch('https://roman4ak.github.io/fe-oop-lab/mocks/epms.json').then(function (
    response
  ) {
    if (response.ok) {
      response.json().then(function (json) {
        buildEmployeeTree(json);
      });
    } else {
      document.getElementsByClassName(
        'root'
      )[0].innerHTML = `Network request for employee.json failed with response ${response.status}`;
    }
  });
}

let root = document.getElementsByClassName('root')[0];
let nav = document.querySelector('nav');
nav.addEventListener('click', menuBarHandler);
let employeesPage = document.querySelector('[href*="employeeTree"]');
let unitsPage = document.querySelector('[href*="unitsTree"]');
let warningPage = document.querySelector('[href*="warningTree"]');
export let pageHeader = document.querySelector('h2');
let allCompanyEmployees;
export const colorPalete = [
  'rgba(255,192,203,.2)',
  'rgba(255,182,193,.2)',
  'rgba(255,105,180,.2)',
  'rgba(255,20,147,.2)',
  'rgba(219,112,147,.2)',
  'rgba(199,21,133,.2)',
  'rgba(205,92,92,.2)',
  'rgba(240,128,128,.2)',
  'rgba(233,150,122,.2)',
  'rgba(250,128,114,.2)',
  'rgba(188,143,143,.2)',
];

let Employee = function (
  id,
  rm_id,
  name,
  performance,
  last_vacation_date = 'null',
  salary,
  pool_name
) {
  this.children = [];
  this.id = id;
  this.rm_id = rm_id;
  this.name = name;
  this.performance = performance;
  this.last_vacation_date = last_vacation_date;
  this.salary = salary;
  this.pool_name = pool_name || null;
};

Employee.prototype = {
  add: function (child) {
    this.children.push(child);
  },

  remove: function (child) {
    let length = this.children.length;
    for (let i = 0; i < length; i++) {
      if (this.children[i] === child) {
        this.children.splice(i, 1);
        return;
      }
    }
  },

  getChild: function (i) {
    return this.children[i];
  },

  hasChildren: function () {
    return this.children.length > 0;
  },
};

let WarningCriterion = function () {
  this.criterion = '';
};

WarningCriterion.prototype = {
  setStrategy: function (criterion) {
    this.criterion = criterion;
  },

  chooseEmployees: function (employee, averageUnitSalary) {
    return this.criterion.chooseEmployees(employee, averageUnitSalary);
  },
};

let HIGH_SALARY = function () {
  this.chooseEmployees = this.chooseEmployees = function (
    employeeNode,
    averageUnitSalary
  ) {
    return employeeNode.salary > averageUnitSalary;
  };
};

let LOW_PERFOMANCE = function () {
  this.chooseEmployees = this.chooseEmployees = function (employeeNode) {
    return employeeNode.performance === 'low';
  };
};

export let warningCriterion = new WarningCriterion();
let highSalary = new HIGH_SALARY();
warningCriterion.setStrategy(highSalary);
export let twoWarningCriterion = new WarningCriterion();
let lowPerfomance = new LOW_PERFOMANCE();
twoWarningCriterion.setStrategy(lowPerfomance);

function menuBarHandler(event) {
  event.preventDefault();
  if (event.target.contains(employeesPage)) {
    createTree(root, allCompanyEmployees[0]);
  } else if (event.target.contains(unitsPage)) {
    createUnitsTree(root, allCompanyEmployees[0]);
  } else if (event.target.contains(warningPage)) {
    createWarningTree(root, allCompanyEmployees[0]);
  }
}

function buildEmployeeTree(employeeData) {
  let employeeArray = employeeData.map((employee) => {
    return new Employee(
      employee.id,
      employee.rm_id,
      employee.name,
      employee.performance,
      employee.last_vacation_date,
      employee.salary,
      employee.pool_name
    );
  });

  employeeArray.forEach((employee) => {
    employeeArray.forEach((rm) => {
      if (employee.id === rm.rm_id) {
        employee.add(rm);
      }
    });
  });

  allCompanyEmployees = employeeArray;
  createTree(root, employeeArray[0]);
}
