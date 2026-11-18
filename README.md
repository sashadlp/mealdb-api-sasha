
#  The MealDB api sasha Passas Youssi

api développé avec node.js et Express, permet d'explorer, filtrer, paginer et analyser les differente recettes de l'API externe TheMealDB, avec système de mise en cache en mémoire(ça permet notamment d'avoir acces a toute les recette quand on cherche par pays).

## Tech Stack

- **Runtime :** Node.js
- **Framework :** Express
- **Source de données :** API publique the meal db (https://www.themealdb.com/api.php)
- **Outils :** Git, GitHub




## Transparence utilisation de l'ia

**l'ia a ete utilisé pour :**
- aide au debuggage commande git (par ailleurs il y a un commit que j'ai generer par ia par erreur et c'est pour ça d'ailleurs que j'ai refait un commit par la suite sans rien)
- l'organisation et structuré ma pensé
- generation de pseudo code pour ensuite moi pouvoir ecrire le code proprement mais seul

## Authors

- [@octokatherine](https://www.github.com/octokatherine)

- [@sashadlp](https://github.com/sashadlp)
## Fonctionnalités principales

- **Cache mémoire :** chargement complet du catalogue TheMealDB pour accélérer les recherches et permettre d'avoir acces quand on utilise le filtre par exemple des pays.
- **Pagination :** découpage dynamique des listes (`page`, `limit`, `total`, `totalPages`).
- **Normalisation des données :** nettoyage des ingrédients et mesures en un tableau structuré avec compteur `nbIngredients`.
- **Gestion des erreurs :** middleware centralisé renvoyant des codes HTTP adaptés (`404`, `500`).
## Installation

Pour installer mon projet étape:
1. ouvrir Visual code studio puis ouvrez un terminal git prompt

2. Cloner le dépôt :
```bash
git clone [https://github.com/sashadlp/mealdb-api-sasha.git](https://github.com/sashadlp/mealdb-api-sasha.git)
cd mealdb-api-sasha    

3. une fois récupérer lancer la commande 
 node --watch server.js


## Documentation des routes

### 1. Récupération de la liste des recettes (paginée)
`GET /api/recettes`

| Paramètre | Type | Description |
| :--- | :--- | :--- |
| `search` | `string` (optionnel) | Recherche simple par nom de recette |
| `page` | `number` (optionnel) | Numéro de la page (défaut : `1`) |
| `limit` | `number` (optionnel) | Nombre de résultats par page (défaut : `25`, max : `25`) |

**Exemple :**
`GET http://localhost:3000/api/recettes?page=2&limit=25`

---

### 2. Recherche filtre multi-critères
`GET /api/recettes/search`

| Paramètre | Type | Description |
| :--- | :--- | :--- |
| `search` | `string` (optionnel) | Filtre sur le nom de la recette |
| `categorie` | `string` (optionnel) | Filtre par catégorie (ex : `Chicken`) |
| `pays` | `string` (optionnel) | Filtre par origine géographique (ex : `france``) |
| `page` | `number` (optionnel) | Numéro de la page (défaut : `1`) |
| `limit` | `number` (optionnel) | Nombre de résultats par page |

**Exemple :**
`GET http://localhost:3000/api/recettes/search?categorie=Seafood&pays=French&page=1&limit=10`

---

### 3. Détail d'une recette par ID
`GET /api/recettes/:id`

| Paramètre | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` (requis) | Identifiant unique de la recette (ex : `52772`) |

**Exemple :**
`GET http://localhost:3000/api/recettes/52772`

---

### 4. Statistiques du catalogue
`GET /api/stats`

Renvoie le nombre total de recettes en cache, la moyenne d'ingrédients par recette, ainsi que la répartition par catégorie et par pays.

