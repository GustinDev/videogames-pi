//https://api.rawg.io/api/games?key=${API_KEY}&page_size=100);

//RAW: https://api.rawg.io/api/games?key=38438bb839ec48ddae76cec99f9c8104&page_size=100

//RAW: https://api.rawg.io/api/games?key=38438bb839ec48ddae76cec99f9c8104&page=1

const axios = require('axios');

const getVideogames = async () => {
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

  return apiGames;
};

module.exports = {
  getVideogames,
};

//Intento 1:

// const { Videogame } = require('../db');
// const axios = require('axios');

// const getApiData = async () => {
//   try {
//     let allGames = [];

//     for (let i = 1; i < array.length; i++) {
//       let games = await axios.get(
//         `https://api.rawg.io/api/games?key=38438bb839ec48ddae76cec99f9c8104&page=${i}`
//       );
//       const allVideogames = games.data.results;
//       allGames = [...allGames, allVideogames];
//       i++;
//     }

//     //Especificamos los datos.

//     const datos = await allGames?.map((response) => {
//       const { id, name, backgound_image, rating, description, released } =
//         response;
//       const ratings = response.ratings?.map((allRating) => allRating.title);
//       const platforms = response.plaforms?.map(
//         (allPlataform) => allPlataform.plaform.name
//       );
//       const genres = response.genres?.map((allGenres) => allGenres.name);
//       return {
//         id,
//         name,
//         backgound_image,
//         rating,
//         description,
//         released,
//         ratings,
//         platforms,
//         genres,
//       };
//     });
//     return datos;
//   } catch (error) {
//     return { error: error.message };
//   }
// };

// const saveApiData = async () => {
//   try {
//     const allVideogames = await getApiData();
//     await Videogame.bulkCreate(allVideogames);
//   } catch (error) {
//     return { error: error.message };
//   }
// };

// module.exports = {
//   saveApiData,
// };
