'use strict';
document.addEventListener('DOMContentLoaded', (function () {

var styleList = [
	'.bodyClear {margin: 0; padding: 0;}',
	'.cssClass {font-size: 20px; font-family: arial;}',
	'.inputBox {margin: 50px auto; width: 320px;}',
	'.testLine {text-align: center; margin-top: 15px;}',
	'.liStyle {line-height: 1.6; margin: 15px 0;}',
	'.submitStyle {height: 50px; width: 320px; border: 1px solid #000; background: #ABD5EB;}',
  '#prompt-form {display: inline-block; position: absolute; top: 50%; left: 50%; margin: -200px 0 0 -100px; width: 400px; height: 200px; border: 1px solid #e8e8e8; border-radius: 10px; background: white;}',
  '#prompt-form input {width: 170px; height: 40px; margin-top: 30px;}',
  '#prompt-form-container {display: block; position: fixed; top: 0; left: 0; z-index: 9999; width: 100%; height: 100%; text-align: center; }',
  '#cover-div { display: none; position: fixed; top: 0; left: 0; z-index: 9000; width: 100%; height: 100%; background-color: rgba(155, 155, 155, 0.5); }',
  '#prompt-form input[name="text"] {display: block; margin: 5px; width: 180px;}'
];

// добавить стили

var style = document.createElement('style');
    style.type = 'text/css';
var styleAddItem = '';

styleList.forEach(function(style_elem) {
    styleAddItem = styleAddItem + style_elem;
});
style.innerHTML = styleAddItem;

document.getElementsByTagName('head')[0].appendChild(style);

var bodyPlace = document.getElementsByTagName('body');
var body = bodyPlace[0];
body.classList.add('cssClass');

try {

// вставить список
  var shablon = document.getElementById('make_form').innerHTML;
  var obj = localStorage.getItem('test_module');
  var myTest = JSON.parse(obj);

  var tmpl = _.template(shablon);
  var testForm = tmpl(myTest);
  body.innerHTML += testForm;

// добавить модальное окно
  var modulShablon = document.getElementById('make_modal').innerHTML;
  var modulFormFunc = _.template(modulShablon);
  var modulForm = modulFormFunc();
  body.innerHTML += modulForm;

// проверка результата
  function checkResult(e) {
      e.preventDefault();
      var i = 0,
      j = 0,
      boxFind = '',
      userCheck = '',
      userProgress = 'right';
        myTest.quesstions.forEach(function () {
          userCheck = '';
          i++;
          j = 0;
          myTest.answers['answers_' + i].forEach ( function () {
            j++;
            boxFind = document.getElementById( 'line' + i + j );
            userCheck += (boxFind.checked) ? 1 : 0;
          });
          myTest.user_answer[i-1] = userCheck;
          if (myTest.correct[i-1] != userCheck) {
            userProgress = 'wrong';
          }
        });
      var obj = JSON.stringify(myTest);
      localStorage.setItem('test_module', obj);

  //  модальное окно

    function hideModul() {
      document.getElementById('cover-div').style.display = 'none';
    };

    document.getElementById('cover-div').style.display = 'block';
    var form = document.getElementById('prompt-form');
    document.getElementById('prompt-message').innerHTML = 'Your answers are ' + userProgress;

    form.onsubmit = function() {
      hideModul();
      return false;
    };

    form.elements.restart.onclick = function() {
      var inputBoxes = document.querySelectorAll( 'input[type="checkbox"]' );
      for(i in inputBoxes){
        if((!(inputBoxes.hasOwnProperty(i))||i==="length")) break;
        if (inputBoxes[i].checked) {
          inputBoxes[i].checked = 0;
        };
      };
      hideModul();
    };

    document.onkeydown = function(e) {        // escape
      if (e.keyCode == 27) {
        hideModul();
      }
    };

  //  конец  модального окна

  };


document.getElementById('submit-form').addEventListener('click', checkResult);


} catch (e) {

  alert('Error. Please, restart page.', e);

  var myTest = {
    formAttr: {
      name: 'test',
      method: 'get'},
    quesstions: [
      'Where the sun can be:',
      'What material the wheels for car can be made from:',
      'Which animal is whild:'],
    answers: {
      answers_1: ['west', 'north', 'south'],
      answers_2: ['stone', 'steel', 'ice'],
      answers_3: ['cat', 'dog', 'wolf'] },
    correct: ['100', '010', '001'],
    user_answer: ['000', '000', '000']
  };

  var obj = JSON.stringify(myTest);
  localStorage.setItem('test_module', obj);

} finally {
  // window.localStorage.clear();
};

})
);








