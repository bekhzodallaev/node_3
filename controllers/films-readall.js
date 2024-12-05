let Films = require('../top250.json');

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(Films);
  });
}

async function readAll(req, res) {
  try {
    const films = await findAll();
    let sortedFilms = films.sort((a, b) => a.position - b.position);
    res.status(200).json(sortedFilms);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  readAll,
};
