const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");

const todos = [
  {
    text: "Buy milk",
    done: false
  },
  {
    text: "Play with dog",
    done: true
  }
];

$input.change(function(event) {
  event.preventDefault();
  
  let todo = {
    text: event.target.value,
    done: false
  }

  todos.push(todo);
  event.target.value = null;
  todo = null
})

$add.click(function(event) {
  event.preventDefault();

  let done = todos[todos.length - 1].done ? 'done' : '';

  let item = `
    <li class="item">
      <span class="item-text ${done}">${todos[todos.length - 1].text}</span>
      <button class="item-remove">Remove</button>
    </li>`
  
  $list.append(item)
})

$list.click(event, todoHandler)

function todoHandler(event) {
  
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
    return;
  }

  if (event.target.tagName === 'BUTTON') {
    let li = $(event.target).parent();
    let todoItem = $(li).find('span').text();
    let itemIndex;

    todos.forEach((elem, index)=> {
      if (elem.text === todoItem) {
        itemIndex = index;
      }
    })

    todos.splice(itemIndex, 1);
    $(li).remove();
    return;
  }
}
