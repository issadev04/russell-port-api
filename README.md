# Port de plaisance Russell — API REST

## Présentation

Cette application permet de gérer les catways, les réservations et les utilisateurs d'un port de plaisance.

Elle comprend :
- Une API REST développée avec Express.
- Une base de données MongoDB.
- Un système d'authentification.
- Une interface web d'administration.
- Une documentation des routes de l'API.

## Technologies utilisées

- **Node.js** : environnement d'exécution JavaScript.
- **Express** : framework pour la création de l'API REST.
- **MongoDB** : base de données NoSQL.
- **Mongoose** : gestion des modèles et des données MongoDB.
- **EJS** : moteur de templates pour les vues dynamiques.
- **JWT** : gestion de l'authentification par jeton.
- **bcrypt** : hachage des mots de passe.
- **cookie-parser** : lecture des cookies HTTP.
- **Morgan** : journalisation des requêtes HTTP.

## Architecture du projet

Le projet suit une architecture organisée en plusieurs couches :

```text
russell-port-api/
├── src/
│   ├── routes/          # Définition des routes HTTP
│   ├── controllers/     # Gestion des requêtes et des réponses
│   ├── services/        # Logique métier
│   ├── models/          # Modèles de données Mongoose
│   ├── middlewares/     # Authentification et traitements intermédiaires
│   └── index.js         # Point d'entrée de l'application
├── public/              # Pages HTML, CSS, JavaScript et ressources statiques
├── views/               # Vues EJS
├── tests/               # Tests automatisés
├── .env.dev             # Variables d'environnement de développement
├── .env.prod            # Variables d'environnement de production
├── .gitignore           # Fichiers exclus du suivi Git
├── package.json         # Dépendances et scripts npm
├── package-lock.json    # Versions verrouillées des dépendances
└── README.md            # Documentation du projet
```

Cette arborescence présente l'organisation générale du projet. Les fichiers et dossiers doivent correspondre à ceux réellement présents dans le dépôt.

## Prérequis

Avant d'installer le projet, vous devez disposer des éléments suivants :

- Node.js
- npm
- Une base de données MongoDB accessible
- Git

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/issadev04/russell-port-api.git
```

### 2. Accéder au dossier du projet

```bash
cd russell-port-api
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer les variables d'environnement

Configurez les variables nécessaires au fonctionnement de l'application, notamment :

- L'URI de connexion à MongoDB.
- Le secret utilisé pour signer les jetons JWT.
- Le port d'écoute de l'application, si nécessaire.
- Le mode d'exécution de l'application.

Le projet utilise des fichiers de configuration distincts pour le développement et la production :

- `.env.dev` : configuration de développement.
- `.env.prod` : configuration de production.

Vérifiez que les scripts de `package.json` chargent bien les fichiers correspondants.

**Important :** ne publiez jamais de mots de passe, de clés JWT ou d'autres secrets dans un dépôt Git public.

## Démarrage de l'application

### Mode développement

```bash
npm run dev
```

Cette commande utilise le script de développement défini dans `package.json`.

### Mode standard

```bash
npm start
```

Cette commande utilise le script de démarrage défini dans `package.json`.

## Fonctionnalités

### Authentification

- Connexion des utilisateurs.
- Authentification par JWT.
- Stockage du jeton dans un cookie HTTP.
- Protection des routes nécessitant une authentification.

### Gestion des utilisateurs

- Création d'utilisateurs.
- Consultation des utilisateurs.
- Modification des informations des utilisateurs.
- Suppression d'utilisateurs.

### Gestion des catways

- Consultation des catways.
- Création de catways.
- Modification de catways.
- Suppression de catways.

### Gestion des réservations

- Consultation des réservations.
- Création de réservations.
- Modification de réservations.
- Suppression de réservations.

### Interface web d'administration

L'application propose une interface permettant d'accéder aux différentes fonctionnalités de gestion :

- Tableau de bord.
- Gestion des utilisateurs.
- Gestion des catways.
- Gestion des réservations.
- Documentation de l'API.

## Application déployée

L'application est accessible en ligne :

- **Accueil :** https://russell-port-api-chcj.onrender.com/
- **Documentation de l'API :** https://russell-port-api-chcj.onrender.com/documentation
- **Contrôle de santé :** https://russell-port-api-chcj.onrender.com/health

La route `/health` permet de contrôler la disponibilité de l'application, selon son implémentation.

## Identifiants de démonstration

Pour présenter l'application, utilisez un compte de démonstration dédié.

Les identifiants doivent être communiqués séparément et uniquement si le compte est toujours actif et prévu pour cet usage.

Évitez de publier un mot de passe fonctionnel dans le dépôt public.

## Sécurité

Les principales mesures de sécurité du projet comprennent :

- Hachage des mots de passe avec bcrypt.
- Authentification par JWT.
- Utilisation d'un cookie HTTP pour transmettre le jeton.
- Protection des routes nécessitant une authentification.
- Configuration des secrets à l'aide de variables d'environnement.

La sécurité effective dépend également de la configuration des cookies, de la validation des données reçues et de la gestion des erreurs.

## Tests

Le projet comporte des tests automatisés.

Pour les exécuter, utilisez la commande définie dans `package.json`.

Vérifiez la présence du script de test avant de lancer une commande npm.

## Licence

Projet pédagogique.