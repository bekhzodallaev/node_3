let Films = require('../top250.json');

async function readById(req, res) {
  try {
    const { id } = req.body;
    const film = Films.find((film) => film.id == id);

    if (!film) {
      return res.status(404).json({ message: 'Film Not Found' });
    }

    res.status(200).json(film);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  readById,
};

module.exports = {
  readById,
};
