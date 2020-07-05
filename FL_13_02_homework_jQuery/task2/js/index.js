const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");

const allTodos = [{
    text: "Buy milk",
    done: false
  },
  {
    text: "Play with dog",
    done: true
  }
];

function removeHtmlTodos() {
  $('.item').each(function() {
    $(this).remove();
  })
}

function generateTodosFromStorage(todos) {
  if (todos.length === 0) return

  let done = todos[todos.length - 1].done ? 'done' : '';

  let item = `
    <li class="item">
      <span class="item-text ${done}">${todos[todos.length - 1].text}</span>
      <button class="item-remove">Remove</button>
    </li>`

  $list.append(item)
}

function addInitialStorage() {
  if (localStorage.getItem('todos')) {
    removeHtmlTodos();
    totalTodoProgress(JSON.parse(localStorage.getItem('todos')))
    generateTodosFromStorage(JSON.parse(localStorage.getItem('todos')))
  } else {
    localStorage.setItem('todos', JSON.stringify(allTodos))
    totalTodoProgress(JSON.parse(localStorage.getItem('todos')))
  }
}

addInitialStorage();

function totalTodoProgress(todos) {
  let done;

  $('.total').text(function () {
    done = todos.reduce((acum = 0, elem) => {
      if (elem.done) {
        acum++;
      }
      return acum;
    }, 0);
    return done;
  });

  $('.in-progress').text(todos.length - done)
  $('[some-attr]').text(todos.length)
}

(function ($) {
  let todos = JSON.parse(localStorage.getItem('todos'))

  $input.change(function (event) {
    event.preventDefault();

    let todo = {
      text: event.target.value,
      done: false
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
    todos = JSON.parse(localStorage.getItem('todos'))
    totalTodoProgress(todos)
    event.target.value = null;
    todo = null
  })
  
  const methods = {

    add: function () {

      this.click(function (event) {
        event.preventDefault();
        let done = todos[todos.length - 1].done ? 'done' : '';

        let item = `
    <li class="item">
      <span class="item-text ${done}">${todos[todos.length - 1].text}</span>
      <button class="item-remove">Remove</button>
    </li>`

        $list.append(item)
      })

      return this;
    },

    show: function () {
      this.click(function todoHandler(event) {
        event.preventDefault();

        if (event.target.tagName === 'UL') {
          return;
        }

        if (event.target.tagName === 'SPAN') {
          let li = $(event.target).parent();
          let todoItem = $(li).find('span').text();
          $(li).find('span').toggleClass('done');

          todos.forEach(elem => {
            if (elem.text === todoItem) {
              elem.done = !elem.done
            }
          })

          localStorage.setItem('todos', JSON.stringify(todos))
          todos = JSON.parse(localStorage.getItem('todos'))
          totalTodoProgress(todos);
          return;
        }

        if (event.target.tagName === 'BUTTON') {
          let li = $(event.target).parent();
          let todoItem = $(li).find('span').text();
          let itemIndex;

          todos.forEach((elem, index) => {
            if (elem.text === todoItem) {
              itemIndex = index;
            }
          })

          todos.splice(itemIndex, 1);
          localStorage.setItem('todos', JSON.stringify(todos))
          todos = JSON.parse(localStorage.getItem('todos'))
          totalTodoProgress(todos);
          $(li).remove();
          return;
        }
      })

      return this
    }
  };

  $.fn.myPlugin = function (method) {

    if (methods[method]) {
      return methods[method].apply(this, arguments);
    } else if (typeof method === 'object' || !method) {
      return methods.add.apply(this, todos);
    } else {
      $.error('Метод с именем ' + method + ' не существует для jQuery.tooltip');
    }

  };

})(jQuery);

$add.myPlugin()
//  .css({'color': 'red'});

$list.myPlugin('show')
//  .css({'color': 'blue'});
