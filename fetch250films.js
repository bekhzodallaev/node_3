const fs = require('fs');
const axios = require('axios');


const BASE_URL = 'https://kinopoiskapiunofficial.tech';
const DELAY_TIME = 200;
const ENDPOINT = '/api/v2.2/films/top';
const TOTAL_PAGES = 13;
const FILE_PATH = './top250.json';

const HEADERS = {
  headers: {
    'X-API-KEY': '0cdceb70-6d1b-4fa7-a3a9-a43284cdbae7',
    'Content-Type': 'application/json',
  },
};

function getURL(endPoint, base, page) {
  const url = new URL(endPoint, base);
  url.searchParams.append('page', `${page}`);

  return url;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function writeFile(data) {
  const dataString = JSON.stringify(data, null, 4);

  fs.writeFile(FILE_PATH, dataString, (err) => {
    if (err) {
      console.log(
        `Error writing top250.json with the message:\n${err.message}`
      );
    }
  });
}

async function getTop250() {
  const films = [];
  console.log('Fetching, please wait...');
  try {
    for (let i = 1; i <= TOTAL_PAGES; i++) {
      const result = await axios.get(getURL(ENDPOINT, BASE_URL, i), HEADERS);
      films.push(...result.data.films);
      await delay(DELAY_TIME);
    }
  } catch (error) {
    console.log(
      `Error: ${error.status ?? ''}\n${
        error.response?.data?.message ?? error.message
      }`
    );
  }

  convertedFilms = convertModel(films);
  writeFile(convertedFilms);
}

function convertModel(films) {
  const convertedFilms = films.map((film, i) => {
    return {
      id: film.filmId,
      title: film.nameEn ?? film.nameRu,
      rating: film.rating,
      year: Number(film.year),
      budget: mockBudget(),
      gross: mockBudget(),
      poster: film.posterUrl,
      position: i + 1,
    };
  });

  return convertedFilms;
}

function mockBudget() {
  return Math.floor(Math.random() * 10_000_000);
}

getTop250();
