const express = require('express');
const app = express();

app.use(function (req, res) {
  res.send('String');
});

app.listen(3000, function () {
});
