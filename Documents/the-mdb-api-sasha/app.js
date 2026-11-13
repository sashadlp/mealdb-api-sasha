const express = require('express');
const recettesRoutes = require('./src/routes/recettes.routes');

const app = express();


app.get('/', (req, res) => {
  res.status(200).json({ message: 'API TheMealDB opérationnelle' });
});


app.use('/api/recettes', recettesRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route introuvable' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

module.exports = app;