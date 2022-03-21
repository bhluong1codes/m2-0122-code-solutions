const express = require('express');
const app = express();

let nextId = 1;
const grades = {};

app.get('/api/grades', (req, res) => {
  const arr = [];
  for (const property in grades) {
    arr.push(grades[property]);
  }
  res.json(arr);
});

app.use(express.json());

app.post('/api/grades', (req, res) => {
  req.body.id = nextId;
  res.status(201).send(req.body);
  grades[1 - nextId] = req.body;
  nextId++;
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening to port 3000!');
});
