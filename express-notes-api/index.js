const express = require('express');
const app = express();

const notes = {};
let nextId = 1;

app.get('/api/notes', (req, res) => {
  const notesArr = [];
  for (const properties in notes) {
    notesArr.push(notes[properties]);
  }
  res.send(notesArr);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id < 1 || isNaN(id)) {
    const err = {
      error: 'id must be a positive integer'
    };
    res.status(400).json(err);
    res.send(typeof id);
  } else if (!notes[id]) {
    const notFound = {
      error: `cannot find note with id ${id}`
    };
    res.status(404).json(notFound);
  } else {
    res.json(notes[id]);
  }
});

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/notes', (req, res, err) => {

  const newNote = req.body;
  if (!newNote.content) {
    const errMsg = {
      error: 'content is a required field'
    };
    res.status(400).send(errMsg);
  } else {
    newNote.id = nextId;
    notes[nextId] = newNote;
    nextId++;
    res.status(201).send(newNote);
  }

});

app.listen(3000, () =>
// eslint-disable-next-line no-console
  console.log('Listening to port 3000')
);
