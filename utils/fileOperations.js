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
module.exports = {
  writeDataToFile,
};
