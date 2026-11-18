const express = require('express');
const router = express.Router();
const mealService = require('../services/meal.service');

router.get('/', async (req, res, next) => {
  try {
    const { search } = req.query;
    const recettes = await mealService.getRecettes(search || '');

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const startIndex = (page - 1) * limit;
    const recettesPaginees = recettes.slice(startIndex, startIndex + limit);

    res.status(200).json({
      total: recettes.length,
      page,
      totalPages: Math.ceil(recettes.length / limit),
      recettes: recettesPaginees
    });
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const { search, categorie, pays } = req.query;

    const resultats = await mealService.filtrerRecettes({ search, categorie, pays });

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 25);
    const startIndex = (page - 1) * limit;
    const resultatsPagines = resultats.slice(startIndex, startIndex + limit);

    res.status(200).json({
      total: resultats.length,
      page,
      totalPages: Math.ceil(resultats.length / limit),
      filtresAppliques: { search, categorie, pays },
      recettes: resultatsPagines
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const recette = await mealService.getRecetteById(id);

    if (!recette) {
      return res.status(404).json({ error: `Aucune recette trouvée avec l'ID ${id}` });
    }

    res.status(200).json(recette);
  } catch (error) {
    next(error);
  }
});

module.exports = router;