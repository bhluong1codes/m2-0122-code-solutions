const fs = require('fs');
const randomNum = Math.random().toString();
fs.writeFile('random.txt', randomNum, err => {
  if (err) {
    console.error(err);
  }
});
