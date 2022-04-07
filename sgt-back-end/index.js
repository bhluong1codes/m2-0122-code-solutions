const express = require('express');
const app = express();

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});

const pg = require('pg');

// only create ONE pool for your whole server
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.get('/api/grades', (req, res) => {
  const sql = `
  select *
    from "grades"
  `;
  db.query(sql)
    .then(result => {
      const grades = result.rows;
      res.status(200).json(grades);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.post('/api/grades', (req, res) => {

  const values = [];
  const name = req.body.name;
  const course = req.body.course;
  const score = Number(req.body.score);
  values.push(name);
  values.push(course);
  values.push(score);

  if (!name && !course) {
    res.status(400).json({
      error: 'name & course are required'
    });
    return;
  } else if (!course) {
    res.status(400).json({
      error: 'course is required'
    });
    return;
  } else if (!name) {
    res.status(400).json({
      error: 'name is required'
    });
    return;
  } else if (!Number.isInteger(score) || score < 0) {
    res.status(400).json({
      error: 'score must be a positive integer'
    });
    return;
  }

  const sql = `
    insert into "grades" ("name", "course", "score")
      values ($1, $2, $3)
      returning *;
  `;

  db.query(sql, values)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});
