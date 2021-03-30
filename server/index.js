require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('../database');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.get('/api/jobs', (req, res) => {
  db.getAllJobs((err, results) => {
    if (err) {
      res.status(404).send(err);
    } else {
      res.status(200).send(results)
    }
  });
});

app.post('/api/jobs', (req, res) => {
  db.addJob(req.body, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results)
    }
  })
});

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}!`);
});