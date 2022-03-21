const express = require('express');
const app = express();

const notes = {};

app.get('/api/notes', (req, res) => {
  const notesArr = [];
  for (const properties in notes) {
    notesArr.push(notes[properties]);
  }
  res.send(notesArr);
});

app.listen(3000, () =>
// eslint-disable-next-line no-console
  console.log('Listening to port 3000')
);
