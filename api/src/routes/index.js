const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// const getAllGames = require('../controllers/getAllGames');

const { getVideogames } = require('../controllers/getVideogames.js');

//GET - ALL

router.get('/videogames', async (req, res) => {
  try {
    const response = await getVideogames();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// router.get('/all', async (req, res) => {
//   try {
//     const allVideogames = await getAllGames();
//     return res.status(200).json(allVideogames);
//   } catch (error) {
//     return res.status(400).send('Hubo un problema...');
//   }
// });

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
