const express = require('express');
const router = express.Router();
const mealService = require('../services/meal.service');

router.get('/', async (req, res, next) => {
  try {
    const stats = await mealService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;