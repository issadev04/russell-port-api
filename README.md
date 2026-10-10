# Port de plaisance Russell — API REST

## Présentation

Cette application permet de gérer les catways, les réservations et les utilisateurs d'un port de plaisance.

Elle comprend une API REST, une interface web d'administration et une documentation des routes.

## Technologies utilisées

- Node.js
- Express
- MongoDB et Mongoose
- EJS
- JWT pour l'authentification
- bcrypt pour le hachage des mots de passe
- cookie-parser
- Morgan

## Architecture du projet

- `src/routes/` : définition des routes HTTP.
- `src/controllers/` : gestion des requêtes et des réponses.
- `src/services/` : logique métier.
- `src/models/` : modèles de données Mongoose.
- `src/middlewares/` : authentification et gestion des erreurs.
- `views/` : vues EJS.
- `public/` : fichiers statiques.
## Installation

Prérequis : Node.js, npm et une base de données MongoDB accessible.

Cloner le dépôt :

```bash
git clone https://github.com/issadev04/russell-port-api.git
cd russell-port-api
npm install
```

## Démarrage

Démarrage standard :

```bash
npm start
```

Démarrage en développement :

```bash
npm run dev
```

Le démarrage standard utilise .env.prod. Le mode développement utilise .env.dev.

Ne publiez jamais les fichiers d'environnement contenant des secrets.

## Fonctionnalités

- Authentification des utilisateurs.
- Gestion des utilisateurs.
- Gestion des catways.
- Gestion des réservations.
- Interface web d'administration.
- Documentation de l'API.
- Route de contrôle de santé : /health.

## Application déployée

- Accueil : https://russell-port-api-chcj.onrender.com/
- Documentation : https://russell-port-api-chcj.onrender.com/documentation
- Contrôle de santé : https://russell-port-api-chcj.onrender.com/health

## Sécurité

- Les mots de passe sont hachés avec bcrypt.
- L'authentification utilise un JWT placé dans un cookie HTTP.
- Les routes protégées nécessitent une authentification.
- Les fichiers d'environnement contenant des secrets ne doivent pas être publiés.

## Licence

Projet pédagogique.


