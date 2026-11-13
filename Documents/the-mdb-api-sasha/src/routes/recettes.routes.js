const express = require('express');
const router = express.Router();
const mealService = require('../services/meal.service');

router.get('/', async (req, res, next) => {
  try {
    const { search } = req.query;
    const recettes = await mealService.getRecettes(search || '');

    res.status(200).json({
      total: recettes.length,
      recettes
    });
  } catch (error) {
    next(error); 
  }
});

module.exports = router;