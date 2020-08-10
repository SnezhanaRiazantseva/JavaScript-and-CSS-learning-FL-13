window.addEventListener('load', function () {
  getInitialUsers();
});

const sendHttpRequest = (method, url) => {
  const promise = new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';

    xhr.onload = function () {
      resolve(xhr.response);
      console.log(xhr.response);
    };
    xhr.send();
  });
  return promise;
};

function getInitialUsers() {
  sendHttpRequest(
    'GET',
    'https://roman4ak.github.io/fe-oop-lab/mocks/epms.json'
  )
    .then((responseData) => run(responseData))
    .catch(() => console.log('Error is here'));
}

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
