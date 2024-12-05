const express = require('express');
const app = express();
const { readAll } = require('./controllers/films-readall');
const { readById } = require('./controllers/films-readById');
const { createFilms } = require('./controllers/films-create');
const { updateFilm } = require('./controllers/films-update');

app.use(express.json());

app.get('/api/films/readall', readAll);
app.get('/api/films/read', readById);
app.post('/api/films/create', createFilms);
app.put('/api/films/update', updateFilm);
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
