const { Videogame } = require('../db');

const createVideogame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  if (
    !name ||
    !description ||
    !platforms ||
    !background_image ||
    !released ||
    !rating ||
    !genres
  ) {
    throw Error('No existen los campos necesarios para crear un juego');
  }

  const newGame = await Videogame.create({
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
  });
  //AGREGAR RELACION
  //await newGame.addGenre(genres);

  return newGame;
};

module.exports = {
  createVideogame,
};
