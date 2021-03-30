require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('../database');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening at localhost:${PORT}!`);
});