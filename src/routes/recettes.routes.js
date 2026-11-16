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

router.get('/search',async(req,res,next)=>{
  try{
    const {search,categorie,pays}= req.query;

    const resultats = await mealService.filtrerRecettes({ search, categorie, pays });

    res.status(200).json({
      total: resultats.length,
      filtresAppliques: { search, categorie, pays },
      recettes: resultats
    });
  } catch (error) {
    next(error);
  }
  }
)
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