//https://api.rawg.io/api/games?key=${API_KEY}&page_size=100);

//RAW: https://api.rawg.io/api/games?key=38438bb839ec48ddae76cec99f9c8104&page=1

const axios = require('axios');
const { Videogame, Genre } = require('../db');

//API + DB WORKING

const getVideogames = async () => {
  //GAMES: API
  const url = `https://api.rawg.io/api/games?key=38438bb839ec48ddae76cec99f9c8104&page=`;
  let apiGames = [];
  let page = 1;
  while (apiGames.length !== 100) {
    let result = await axios(`${url}${page}`);
    apiGames = [...apiGames, ...result.data.results];
    ++page;
  }

  apiGames = apiGames.map((game) => {
    return {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      genres: game.genres,
      platforms: game.platforms.map((el) => el.platform.name),
      origin: 'api',
      rating: game.rating,
    };
  });

  //return apiGames;

  //GAMES: DB

  const dbGames = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  //ALL GAMES (DB + API):

  const allGames = [...apiGames, ...dbGames];
  return allGames;
};

module.exports = {
  getVideogames,
};
