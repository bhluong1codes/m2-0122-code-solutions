// const fs = require('fs');
const { notes } = require('./data.json');

if (process.argv[2] === 'read') {
  for (const property in notes) {
    console.log(`${property}: ${notes[property]}`);
  }
}

// fs.readFile('data.json', 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   var { notes } = data;
//   console.log(notes);
//   console.log(typeof notes);
// });

// if (process.argv[3] === 'plus') {
//   console.log('result:', add(firstNum, secondNum));
// } else if (process.argv[3] === 'minus') {
//   console.log('result:', subtract(firstNum, secondNum));
// } else if (process.argv[3] === 'times') {
//   console.log('result:', multiply(firstNum, secondNum));
// } else if (process.argv[3] === 'over') {
//   console.log('result:', divide(firstNum, secondNum));
// }
