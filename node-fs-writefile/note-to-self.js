const fs = require('fs');
const userInput = process.argv[2];
fs.writeFile('note.txt', userInput, err => {
  if (err) {
    console.error(err);
  }
});
