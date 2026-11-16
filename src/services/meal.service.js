const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
let cacheToutesLesRecettes = null;
function formatRecette(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
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
async function getToutesLesRecettes() {
  if (cacheToutesLesRecettes !==null) {
    return cacheToutesLesRecettes;
  }
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let index = 0;
  const toutesLesRecettes = [];

  while(index < alphabet.length){
    const lettre= alphabet[index];
    const response=await fetch(`${BASE_URL}/search.php?f=${lettre}`);
    const data = await response.json();
      if (data.meals) {
    const recettesNettoyees = data.meals.map(formatRecette);
      toutesLesRecettes.push(...recettesNettoyees);
  }
  index+=1
  }

  cacheToutesLesRecettes= toutesLesRecettes
 return toutesLesRecettes

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

async function filtrerRecettes(criteres = {}) {
  const { search, categorie, pays } = criteres;
  let recettes = search ? await getRecettes(search) : await getToutesLesRecettes();

  if (categorie) {
    recettes = recettes.filter(
      recette => recette.categorie?.toLowerCase() === categorie.toLowerCase()
    );
  }
  if (pays) {
    recettes = recettes.filter(
      recette => recette.pays?.toLowerCase() === pays.toLowerCase()
    );
  }
  return recettes;
}
async function getStats() {
 const recettes=   await getToutesLesRecettes();

 const parCategorie = {};
  const parPays = {};
  let totalIngredients = 0;

  recettes.forEach(recettes => {
    totalIngredients+=recettes.nbIngredients
    if (recettes.categorie) {
      if (parCategorie[recettes.categorie]) {
        parCategorie[recettes.categorie]+=1
      }
      else{
        parCategorie[recettes.categorie]=1
      }
    }
    if (recettes.pays) {
      if (parPays[recettes.pays]) {
        parPays[recettes.pays]+=1
      }
      else{
        parPays[recettes.pays]=1
      }
    }
    
  });
  const moyenne = recettes.length > 0 ? totalIngredients / recettes.length : 0;
 return{
    totalRecettes: recettes.length,
    moyenneIngredients: Number(moyenne.toFixed(1)),
    repartitionParCategorie: parCategorie,
    repartitionParPays: parPays
 } ;
}
module.exports = {
  getRecettes,
  getRecetteById,
  getToutesLesRecettes,
  filtrerRecettes,
  getStats
};