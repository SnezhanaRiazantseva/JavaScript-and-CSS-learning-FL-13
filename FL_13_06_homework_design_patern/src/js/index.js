// const employeeData = [
//   {
//     id: 1,
//     rm_id: null,
//     name: 'Ange Quittonden',
//     performance: 'top',
//     last_vacation_date: '24.04.2018',
//     salary: 1415,
//     pool_name: 'Top pool',
//   },
//   {
//     id: 2,
//     rm_id: 1,
//     name: 'Bobina Pascow',
//     performance: 'low',
//     last_vacation_date: '26.12.2018',
//     salary: 1248,
//   },
//   {
//     id: 3,
//     rm_id: 1,
//     name: 'Hashim Stein',
//     performance: 'top',
//     last_vacation_date: '07.06.2019',
//     salary: 679,
//   },
//   {
//     id: 4,
//     rm_id: 1,
//     name: 'Bernadene Gillum',
//     performance: 'average',
//     last_vacation_date: '19.10.2019',
//     salary: 1484,
//   },
//   {
//     id: 5,
//     rm_id: 1,
//     name: 'Yale Masedon',
//     performance: 'average',
//     last_vacation_date: '10.03.2020',
//     salary: 583,
//   },
//   {
//     id: 6,
//     rm_id: 1,
//     name: 'Ellissa Cayton',
//     performance: 'top',
//     last_vacation_date: '26.10.2019',
//     salary: 1289,
//   },
//   {
//     id: 7,
//     rm_id: 1,
//     name: 'Marybelle Kelston',
//     performance: 'top',
//     last_vacation_date: '13.03.2018',
//     salary: 1382,
//     pool_name: 'Oscar',
//   },
//   {
//     id: 8,
//     rm_id: 1,
//     name: 'Vevay Cowern',
//     performance: 'average',
//     last_vacation_date: '17.11.2018',
//     salary: 1301,
//   },
//   {
//     id: 9,
//     rm_id: 1,
//     name: 'Bondy Ridolfo',
//     performance: 'low',
//     last_vacation_date: '15.06.2018',
//     salary: 1146,
//   },
//   {
//     id: 10,
//     rm_id: 1,
//     name: 'Valenka Macguire',
//     performance: 'low',
//     last_vacation_date: '03.05.2017',
//     salary: 1236,
//   },
//   {
//     id: 11,
//     rm_id: 7,
//     name: 'Irene Prodrick',
//     performance: 'low',
//     last_vacation_date: '06.01.2019',
//     salary: 1371,
//   },
//   {
//     id: 12,
//     rm_id: 7,
//     name: 'Ella Kilpin',
//     performance: 'top',
//     last_vacation_date: '08.11.2018',
//     salary: 739,
//   },
//   {
//     id: 13,
//     rm_id: 7,
//     name: 'Raeann Regenhardt',
//     performance: 'top',
//     last_vacation_date: '19.01.2018',
//     salary: 1450,
//   },
//   {
//     id: 14,
//     rm_id: 7,
//     name: 'Emile Jobbins',
//     performance: 'low',
//     last_vacation_date: '03.09.2019',
//     salary: 1452,
//   },
//   {
//     id: 15,
//     rm_id: 1,
//     name: "Richard D'Antonio",
//     performance: 'low',
//     last_vacation_date: '20.08.2019',
//     salary: 788,
//   },
// ];

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

// function getInitialUsers() {
//   sendHttpRequest(
//     'GET',
//     'https://roman4ak.github.io/fe-oop-lab/mocks/epms.json'
//   )
//     .then((responseData) => run(responseData))
//     .catch(() => console.log('Error is here'));
// }

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

  // remove: function (child) {
  //   let length = this.children.length;
  //   for (let i = 0; i < length; i++) {
  //     if (this.children[i] === child) {
  //       this.children.splice(i, 1);
  //       return;
  //     }
  //   }
  // },

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

  let root = document.getElementsByClassName('root')[0];

  // traverse(1, employeeArray[0]);
  // log.show();

  createTree(root, employeeArray[0]);
}

// run();

function createTree(container, obj) {
  // console.log(obj);
  if (Object.entries(obj).length === 0 && obj.constructor === Object) {
    document.getElementsByClassName('root')[0].innerHTML =
      'В организации нету сотрудников.';
    return;
  }
  container.innerHTML = createTreeText(obj);
}

function createTreeText(node) {
  let li = '';
  let ul;
  li += `<li>`;
  if (node.hasChildren()) {
    li += `<strong>${node.name}</strong>`;
    for (let i = 0, len = node.children.length; i < len; i++) {
      li += createTreeText(node.getChild(i));
    }
  } else {
    li += `${node.name}`;
  }
  li += `</li>`;

  if (li) {
    ul = '<ul class="ulItem">' + li + '</ul>';
  }
  return ul || '';
}

// fetch('https://roman4ak.github.io/fe-oop-lab/mocks/epms.json').then(function (
//   response
// ) {
//   if (response.ok) {
//     response.json().then(function (json) {
//       run(json);
//     });
//   } else {
//     console.log(
//       'Network request for employee.json failed with response ' +
//         response.status +
//         ': ' +
//         response.statusText
//     );
//   }
// });
