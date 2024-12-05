const { writeDataToFile } = require('../utils/fileOperations');
const path = require('path');

let Films = require('../top250.json');

function remove(id) {
  return new Promise((resolve, reject) => {
    const filteredFilms = Films.filter((film) => film.id !== id);
    if (process.env.NODE_ENV !== 'test') {
      writeDataToFile('../top250.json', filteredFilms);
    }
    resolve(filteredFilms);
  });
}

async function deleteFilm(req, res) {
  try {
    const { id } = req.body;
    const film = Films.find((film) => film.id == id);

    if (!film) {
      res.status(404).json({ message: 'FIlm Not Found' });
    } else {
      await remove(id);
      res.status(200).json(film);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  deleteFilm,
};
