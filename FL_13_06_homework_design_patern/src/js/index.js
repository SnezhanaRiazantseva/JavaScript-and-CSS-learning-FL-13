window.addEventListener('load', function () {
  getInitialUsers();
});

// const sendHttpRequest = (method, url) => {
//   const promise = new Promise((resolve) => {
//     const xhr = new XMLHttpRequest();

//     xhr.open(method, url);

//     xhr.responseType = 'json';

//     xhr.onload = function () {
//       resolve(xhr.response);
//       console.log(xhr.response);
//     };
//     xhr.send();
//   });
//   return promise;
// };

function getInitialUsers() {
  fetch('https://roman4ak.github.io/fe-oop-lab/mocks/epms.json').then(function (
    response
  ) {
    if (response.ok) {
      response.json().then(function (json) {
        run(json);
      });
    } else {
      document.getElementsByClassName(
        'root'
      )[0].innerHTML = `Network request for employee.json failed with response ${response.status}`;
    }
  });
}
// sendHttpRequest(
//   'GET',
//   'https://roman4ak.github.io/fe-oop-lab/mocks/epms.json'
// )
//   .then((responseData) => run(responseData))
//   .catch(() => console.log('Error is here'));

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

function run(employeeData) {
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

  // let sortedNodes = employeeArray.map((employee) => {
  //   if (employeeArray.children.map((child) => {
  //     if (child.hasChildren()) {
  //     }
  //   }))
  //   // return employee.children;
  // });

  let root = document.getElementsByClassName('root')[0];
  let unitRoot = document.getElementsByClassName('unitRoot')[0];
  console.log(unitRoot);
  createTree(root, employeeArray[0]);
  createUnitsTree(unitRoot, employeeArray[0]);
}

function createTree(container, obj) {
  if (Object.entries(obj).length === 0 && obj.constructor === Object) {
    document.getElementsByClassName('root')[0].innerHTML =
      'В организации нету сотрудников.';
    return;
  }
  // container.insertAdjacentHTML('afterend', createTreeText(obj));
  container.innerHTML = createTreeText(obj);
}

// const colorPalete = [
//   'pink',
//   'lightpink',
//   'hotpink',
//   'deeppink',
//   'palevioletred',
//   'mediumvioletred',
//   'indianred',
//   'lightcoral',
//   'darksalmon',
//   'salmon',
//   'rosybrown',
// ];

const colorPalete = [
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

let iForColors = colorPalete.length - 1;

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
      ul = `<ul class="ulItem" style="background-color: ${colorPalete[iForColors]};">${li}</ul>`;
    }
  } else {
    li += `${node.name}</li>`;
    return li;
  }
  iForColors -= 1;
  return ul || '';
}

function createUnitsTree(container, obj) {
  if (Object.entries(obj).length === 0 && obj.constructor === Object) {
    document.getElementsByClassName('Unitroot')[0].innerHTML =
      'В организации нету подразделений.';
    return;
  }
  container.innerHTML = createUnitsTreeText(obj);
}

const performancePalete = {
  low: -1,
  average: 0,
  top: 1,
  '-1': 'low',
  '0': 'average',
  '1': 'top',
};

function createUnitsTreeText(node) {
  let li = '';
  let ul;
  li += `<li>`;
  if (node.pool_name) {
    // console.log(node);
    // console.log(node.pool_name);
    li += `<strong>${node.pool_name}</strong>`;

    let averageLowPerfomance = node.children.reduce((acum, employee) => {
      if (performancePalete[employee.performance] === -1) {
        acum++;
      }
      return acum;
    }, 0);
    let averageAveragePerfomance = node.children.reduce((acum, employee) => {
      if (performancePalete[employee.performance] === 0) {
        acum++;
      }
      return acum;
    }, 0);
    let averageHighPerfomance = node.children.reduce((acum, employee) => {
      if (performancePalete[employee.performance] === 1) {
        acum++;
      }
      return acum;
    }, 0);
    if (node.performance === 'average') {
      averageAveragePerfomance++;
    } else if (node.performance === 'low') {
      averageLowPerfomance++;
    } else {
      averageHighPerfomance++;
    }
    let unitAmount = node.children.length + 1;
    let allPerfomances = [
      averageAveragePerfomance,
      averageLowPerfomance,
      averageHighPerfomance,
    ];
    let unitAveragePerfomance;
    let maxQuantityPerfomance = Math.max.apply(null, allPerfomances);
    if (maxQuantityPerfomance === allPerfomances[0]) {
      unitAveragePerfomance = performancePalete[0];
    } else if (maxQuantityPerfomance === allPerfomances[1]) {
      unitAveragePerfomance = performancePalete[-1];
    } else {
      unitAveragePerfomance = performancePalete[1];
    }

    let nodeChildrenSalary = node.children.reduce((amount, employee) => {
      amount += employee.salary;
      return amount;
    }, 0);
    let allSalary = nodeChildrenSalary + node.salary;
    let averageUnitSalary = allSalary / unitAmount;

    li += `<p>High perfomance: ${averageHighPerfomance} from ${unitAmount} empoyees.
    Average perfomance: ${averageAveragePerfomance} from ${unitAmount} empoyees.
    Low perfomance: ${averageLowPerfomance} from ${unitAmount} unitAmount.
    Unit average perfomance is <b>${unitAveragePerfomance}</b>.</p>`;
    // eslint-disable-next-line prettier/prettier
    li += `<p>Average unit salary is <b>${averageUnitSalary.toFixed(2)}$</b>.</p></li>`;
    for (let i = 0, len = node.children.length; i < len; i++) {
      li += createUnitsTreeText(node.getChild(i));
    }
    // console.log(colorPalete[iForColors], iForColors);
    ul = `<ul class="ulItem" style="background-color: ${colorPalete[iForColors]};">${li}</ul>`;
    iForColors += 1;
  }
  return ul || '';
}
