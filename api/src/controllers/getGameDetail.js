const axios = require('axios');

const getGameDetail = async (idVideogame) => {
  //NO DB - JUST API
  try {
    const url = `https://api.rawg.io/api/games/${idVideogame}?key=38438bb839ec48ddae76cec99f9c8104`;
    const apiGame = await axios(url);
    if (Object.keys(apiGame.data).length !== 0) {
      return {
        id: apiGame.data.id,
        name: apiGame.data.name,
        description: apiGame.data.description,
        platforms: apiGame.data.platforms.map((el) => el.platform.name),
        background_image: apiGame.data.background_image,
        released: apiGame.data.released,
        rating: apiGame.data.rating,
        genres: apiGame.data.genres,
      };
    }
  } catch (error) {
    throw new Error('Algo ha fallado.');
  }
};

module.exports = {
  getGameDetail,
};
