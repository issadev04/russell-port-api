// Importe le module de test intégré à Node.js
const test = require("node:test");

// Importe le module d'assertions strictes pour vérifier les résultats
const assert = require("node:assert/strict");

// Importe la fonction de gestion des erreurs du contrôleur des catways
const { handleError } = require("../src/controllers/catwaysController");

// Crée une réponse HTTP simulée pour tester handleError sans serveur
function createMockResponse() {
  return {
    // Stocke le code HTTP renvoyé
    statusCode: null,

    // Stocke le contenu JSON de la réponse
    body: null,

    // Simule la méthode Express res.status()
    status(code) {
      this.statusCode = code;
      return this;
    },

    // Simule la méthode Express res.json()
    json(data) {
      this.body = data;
      return this;
    }
  };
}

// Vérifie qu'une erreur de validation Mongoose renvoie le code HTTP 400
test("Une erreur de validation Mongoose renvoie 400", () => {
  const res = createMockResponse();

  // Simule une erreur de validation Mongoose
  const error = { name: "ValidationError" };

  // Appelle la fonction de gestion des erreurs
  handleError(res, error);

  // Vérifie le code HTTP renvoyé
  assert.equal(res.statusCode, 400);

  // Vérifie le message JSON renvoyé
  assert.deepEqual(res.body, { message: "Données invalides" });
});

// Vérifie qu'une erreur de conversion de type CastError renvoie HTTP 400
test("Une erreur CastError renvoie 400", () => {
  const res = createMockResponse();

  // Simule une erreur de conversion de type Mongoose
  const error = { name: "CastError" };

  // Appelle la fonction de gestion des erreurs
  handleError(res, error);

  // Vérifie le code HTTP renvoyé
  assert.equal(res.statusCode, 400);

  // Vérifie le message JSON renvoyé
  assert.deepEqual(res.body, { message: "Données invalides" });
});

// Vérifie qu'une erreur de doublon MongoDB renvoie HTTP 400
test("Une erreur de doublon MongoDB renvoie 400", () => {
  const res = createMockResponse();

  // Simule une erreur MongoDB de code 11000 (valeur déjà existante)
  const error = { code: 11000 };

  // Appelle la fonction de gestion des erreurs
  handleError(res, error);

  // Vérifie le code HTTP renvoyé
  assert.equal(res.statusCode, 400);

  // Vérifie le message JSON renvoyé
  assert.deepEqual(res.body, { message: "Données invalides" });
});

// Vérifie qu'une erreur technique inattendue renvoie HTTP 500
test("Une erreur technique inattendue renvoie 500", () => {
  const res = createMockResponse();

  // Crée une erreur technique simulée
  const error = new Error("Erreur technique");

  // Appelle la fonction de gestion des erreurs
  handleError(res, error);

  // Vérifie le code HTTP renvoyé
  assert.equal(res.statusCode, 500);

  // Vérifie que le message exposé ne révèle pas les détails techniques
  assert.deepEqual(res.body, { message: "Erreur serveur" });
});