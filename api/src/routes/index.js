const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const { getVideogames } = require('../controllers/getVideogames.js');
const { getGameDetail } = require('../controllers/getGameDetail.js');
const { createVideogame } = require('../controllers/createVideogame.js');

//GET - ALL
router.get('/videogames', async (req, res) => {
  try {
    const response = await getVideogames();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//GET DETAIL

router.get('/videogames/:idVideogame', async (req, res) => {
  const { idVideogame } = req.params;
  try {
    const gameDetail = await getGameDetail(idVideogame);
    return res.status(200).json(gameDetail);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

//POST - NEW GAME:

router.post('/videogames', async (req, res) => {
  const {
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genres,
  } = req.body;
  try {
    const newGame = await createVideogame(
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres
    );

    res.status(200).json(newGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
});

module.exports = router;
