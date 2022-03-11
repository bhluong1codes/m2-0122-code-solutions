const fs = require('fs');
const dataJson = require('./data.json');
const { nextId } = require('./data.json');

if (process.argv[2] === 'read') {
  for (const property in dataJson.notes) {
    console.log(`${property}: ${dataJson.notes[property]}`);
  }
} else if (process.argv[2] === 'create' && process.argv[3]) {
  dataJson.notes[nextId] = process.argv[3];
  dataJson.nextId++;
}

fs.writeFile('data.json', JSON.stringify(dataJson, null, 2), err => {
  if (err) {
    console.error(err);
  }
});
