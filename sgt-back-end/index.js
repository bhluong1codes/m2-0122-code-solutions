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

  const params = [];
  const name = req.body.name;
  const course = req.body.course;
  const score = Number(req.body.score);
  params.push(name);
  params.push(course);
  params.push(score);

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

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});

app.put('/api/grades/:gradeId', (req, res) => {

  const gradeId = Number(req.params.gradeId);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    res.status(400).json({
      error: '"gradeId" must be a positive integer'
    });
    return;
  }

  const params = [];
  const name = req.body.name;
  const course = req.body.course;
  const score = Number(req.body.score);
  params.push(name);
  params.push(course);
  params.push(score);
  params.push(gradeId);

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
    update "grades"
      set "name" = $1,
          "course" = $2,
          "score" = $3
    where "gradeId" = $4
    returning *;
  `;

  db.query(sql, params)
    .then(result => {
      const grade = result.rows;
      if (!grade) {
        res.status(404).json({
          error: `Cannot find grade with "gradeId" ${gradeId}`
        });
      } else {
        res.json(grade);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });
});
