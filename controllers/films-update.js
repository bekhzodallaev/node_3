const { writeDataToFile } = require('../utils/fileOperations');
const path = require('path');
const validateFilmData = require('../validators/filmValidator');

let Films = require('../top250.json');

function shiftPositions(films, newPosition) {
  return films.map((film) => {
    if (film.position >= newPosition) {
      return { ...film, position: film.position + 1 };
    }
    return film;
  });
}

async function updateFilm(req, res) {
  try {
    const { id, title, rating, year, budget, gross, poster, position } =
      req.body;

    const validationErrors = validateFilmData({
      title,
      rating,
      year,
      budget,
      gross,
      poster,
      position,
    });
    if (validationErrors) {
      return res
        .status(400)
        .json({ message: 'Validation failed', errors: validationErrors });
    }
    Films = shiftPositions(Films, position);

    const filmIndex = Films.findIndex((film) => film.id == id);
    if (filmIndex === -1) {
      res.status(404).json({ message: 'Film Not Found' });
    } else {
      Films[filmIndex] = {
        ...Films[filmIndex],
        title: title || Films[filmIndex].title,
        rating: rating || Films[filmIndex].rating,
        year: year || Films[filmIndex].year,
        budget: budget || Films[filmIndex].budget,
        gross: gross || Films[filmIndex].gross,
        poster: poster || Films[filmIndex].poster,
        position: position || Films[filmIndex].position,
      };
    }
    const filePath = path.join(__dirname, '../top250.json');
    await writeDataToFile(filePath, Films);
    res.status(200).json(Films[filmIndex]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating a film' });
  }
}

module.exports = {
  updateFilm,
};
