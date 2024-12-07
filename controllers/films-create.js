const { v4: uuidv4 } = require('uuid');
const { writeDataToFile, shiftPositions } = require('../utils/utils');
const path = require('path');
const { validateFilmData } = require('../validators/filmValidator');

let Films = require('../top250.json');

async function createFilms(req, res) {
  try {
    const { title, rating, year, budget, gross, poster, position } = req.body;

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
    const { updatedFilms, adjustedPosition } = shiftPositions(Films, position);
    Films = updatedFilms;

    const newFilm = {
      id: uuidv4(),
      title: title,
      rating: rating,
      year: year,
      budget: budget,
      gross: gross,
      poster: poster,
      position: adjustedPosition,
    };
    Films.push(newFilm);

    const filePath = path.join(__dirname, '../top250.json');
    await writeDataToFile(filePath, Films);
    res.status(201).json(newFilm);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating a film' });
  }
}
module.exports = {
  createFilms,
};
