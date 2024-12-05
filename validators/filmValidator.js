function validateFilmData(data) {
  const errors = [];

  if (
    !data.title ||
    typeof data.title !== 'string' ||
    data.title.trim() === ''
  ) {
    errors.push('Title is required and must be a non-empty string.');
  }

  if (
    !data.rating ||
    typeof data.rating !== 'string' ||
    data.rating.trim() === ''
  ) {
    errors.push('Rating is required and must be a non-empty string.');
  }

  if (!data.year || isNaN(Date.parse(data.year)) || data.year < 1895) {
    errors.push('valid year is required and must be a valid year');
  }

  if (!data.budget || typeof data.budget !== 'number' || data.budget < 0) {
    errors.push('A budget is required and must be a non-negative number.');
  }

  if (!data.gross || typeof data.gross !== 'number' || data.gross < 0) {
    errors.push('A gross is required and must be a non-negative number.');
  }

  if (
    !data.poster ||
    !/^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(data.poster)
  ) {
    errors.push(
      'A valid poster URL is required and must point to an image (e.g ., .jpg, .jpeg, .png).'
    );
  }

  if (
    !data.position ||
    typeof data.position !== 'number' ||
    data.position <= 0
  ) {
    errors.push('A position is required and must be a non-negative number');
  }

  return errors.length > 0 ? errors : null;
}
module.exports = {
  validateFilmData,
};
