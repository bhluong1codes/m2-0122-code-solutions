const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

var firstNum = parseInt(process.argv[2]);
var secondNum = parseInt(process.argv[4]);
if (process.argv[3] === 'plus') {
  console.log('result:', add(firstNum, secondNum));
} else if (process.argv[3] === 'minus') {
  console.log('result:', subtract(firstNum, secondNum));
} else if (process.argv[3] === 'times') {
  console.log('result:', multiply(firstNum, secondNum));
} else if (process.argv[3] === 'over') {
  console.log('result:', divide(firstNum, secondNum));
}
