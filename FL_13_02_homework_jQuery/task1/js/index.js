// Example: $('#someId').css({'prop' : 'value', 'prop1' : 'value1', ...});

//body: add padding 30px
$('body').css({'padding': '30px'});

// id title: make align center, remove top margin
$('#title').css({'text-align': 'center', 'margin-top': 0});

// div after header: add double border and padding 20px
$('#header + div').css({'border': '20px double black'});

// change color for all h2 and set top margin to 0
$('h2').css({'color': '#3234fd', 'margin-top': 0});

// set font size 18px for all .list direct children
$('.list >').css({'font-size': '18px'});

// in #list-1
  // show all hidden and not cloned li
$('#list-1>li:hidden:not(.cloned)').show();
  // hide empty li
$('#list-1>li:empty').attr('hidden', true);

// in #list-3
  // for all even li set margin-left -20px
$('#list-3>li:nth-child(even)').css({'margin-left': '-20px'});
  // for the first li set any different color
$('#list-3>li:first-child').css({'color': '#898989'});
  // for all li with index > 5 set color to #ccc
$('#list-3>li').eq(5).css({'color': '#ccc'});

// for li wich has em add red color
$('li').has('em').css({'color': 'red'});

// for li which contains text 'Buratino' set font weight to bold "div:contains('John')"
$('.list li:contains("Buratino")').css({'font-weight': 'bold'});
// $('.list li').each(function() {
//   if ($(this).text() === "Buratino") {
//     $(this).css({'font-weight': 'bold'});
//   }
// })

// for b in p which is the only child set font size 36px
$('p b:only-child').css({'font-size': '36px'});

// for em in p which is the last child of type set color to green
$('p em:last-of-type').css({'color': 'green'});


// set width 80px for input with attribute name ended by 'age'
$('[name$="age"]').width('80px');
// set width 120px for input with attribute name started by 'my'
$('[name^="my"]').width('120px');
// console.log checked checkbox
let checked = $('input:checked').val();
console.log(checked)
// show all images with a cat
$('img[src*="cat"]').show();

// wrap every image into the div
$('img').wrap("<div class='new'></div>");
// for .mbox with index 3 set padding-top 50px
$('.mbox').eq(3).css({'padding-top': '50px'});
// for first div wraper for img set float left and border red
$('.mbox .new:first-child').css({'float': 'left', 'border': '1px solid red'});