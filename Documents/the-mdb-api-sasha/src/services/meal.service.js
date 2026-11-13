const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

function formatRecette(meal) {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const nom = meal[`strIngredient${i}`];
    const quantite = meal[`strMeasure${i}`];

    if (nom && nom.trim() !== '') {
      ingredients.push({
        nom: nom.trim(),
        quantite: quantite ? quantite.trim() : ''
      });
    }
  }

  return {
    id: meal.idMeal,
    nom: meal.strMeal,
    categorie: meal.strCategory,
    pays: meal.strArea,
    image: meal.strMealThumb,
    ingredients,
    nbIngredients: ingredients.length
  };
}


async function getRecettes(recherche = '') {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(recherche)}`);
  if (!response.ok) {
    throw new Error('Erreur lors de la communication avec TheMealDB');
  }

  const data = await response.json();

  if (!data.meals) {
    return [];
  }

  return data.meals.map(formatRecette);
}

async function getRecetteById(id) {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  if (!response.ok) {
    throw new Error('Erreur lors de la communication avec TheMealDB');
  }

  const data = await response.json();

  if (!data.meals || data.meals.length === 0) {
    return null;
  }

  return formatRecette(data.meals[0]);
}

module.exports = {
  getRecettes,
  getRecetteById
};