const express = require('express');
const app = express();
const fs = require('fs');
const dataJson = require('./data.json');

app.get('/api/notes', (req, res) => {
  const notesArr = [];
  for (const properties in dataJson.notes) {
    notesArr.push(dataJson.notes[properties]);
  }
  res.send(notesArr);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id < 1 || isNaN(id)) {
    const errMsg = {
      error: 'id must be a positive integer'
    };
    res.status(400).json(errMsg);
  } else if (!dataJson.notes[id]) {
    const notFound = {
      error: `cannot find note with id ${id}`
    };
    res.status(404).json(notFound);
  } else {
    res.json(dataJson.notes[id]);
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
    const id = dataJson.nextId++;
    newNote.id = id;
    dataJson.notes[id] = newNote;

    const dataStringify = JSON.stringify(dataJson, null, 2);
    fs.writeFile('data.json', dataStringify, err => {
      if (err) {
        console.error(err);
        const errMsg = { error: 'An unexpected error occurred.' };
        res.status(500).send(errMsg);
      } else {
        res.status(201).send(newNote);
      }
    });

  }

});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id < 1 || isNaN(id)) {
    const errMsg = {
      error: 'id must be a positive integer'
    };
    res.status(400).json(errMsg);
  } else if (!dataJson.notes[id]) {
    const notFound = {
      error: `cannot find note with id ${id}`
    };
    res.status(404).json(notFound);
  } else {
    delete dataJson.notes[id];
    const dataStringify = JSON.stringify(dataJson, null, 2);
    fs.writeFile('data.json', dataStringify, err => {
      if (err) {
        console.error(err);
        const errMsg = { error: 'An unexpected error occurred.' };
        res.status(500).send(errMsg);
      } else {
        res.sendStatus(204);
      }
    });
  }
});

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const newNote = req.body;
  if (id < 1 || isNaN(id)) {
    const errMsg = {
      error: 'id must be a positive integer'
    };
    res.status(400).json(errMsg);

  } else if (!dataJson.notes[id]) {
    const notFound = {
      error: `cannot find note with id ${id}`
    };
    res.status(404).json(notFound);
  } else if (!newNote.content) {
    const errMsg = {
      error: 'content is a required field'
    };
    res.status(400).send(errMsg);
  } else {
    dataJson.notes[id].content = newNote.content;
    const dataStringify = JSON.stringify(dataJson, null, 2);
    fs.writeFile('data.json', dataStringify, err => {
      if (err) {
        console.error(err);
        const errMsg = { error: 'An unexpected error occurred.' };
        res.status(500).send(errMsg);
      } else {
        res.status(200).send(dataJson.notes[id]);
      }
    });
  }
});

app.listen(3000, () => {
// eslint-disable-next-line no-console
  console.log('Listening to port 3000');
}
);
