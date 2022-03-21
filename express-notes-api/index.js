const express = require('express');
const app = express();

const notes =
  {
    1:
    {
      content: 'The event loop is how a JavaScript runtime pushes asynchronous callbacks onto the stack once the stack is cleared.',
      id: 1
    },
    2:
    {
      content: 'Prototypal inheritance is how JavaScript objects delegate behavior.',
      id: 2
    }

  };

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

app.listen(3000, () =>
// eslint-disable-next-line no-console
  console.log('Listening to port 3000')
);
