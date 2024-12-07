const fs = require('fs');
const path = require('path');

function writeDataToFile(filename, content) {
  try {
    const filePath = path.isAbsolute(filename)
      ? filename
      : path.join(__dirname, filename);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
  } catch (error) {
    console.log(`Error Writing to file ${filename}:`, error.message);
    throw new Error('Failed to write data to file');
  }
}

function shiftPositions(films, newPosition) {
  const maxPosition = Math.max(...films.map((film) => film.position), 0);

  if (newPosition > maxPosition + 1) {
    newPosition = maxPosition + 1;
  }

  return {
    updatedFilms: films.map((film) => {
      if (film.position >= newPosition) {
        return { ...film, position: film.position + 1 };
      }
      return film;
    }),
    adjustedPosition: newPosition,
  };
}

module.exports = {
  writeDataToFile,
  shiftPositions,
};
