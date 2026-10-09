const test = require("node:test");
const assert = require("node:assert/strict");

const { handleError } = require("../src/controllers/catwaysController");

function createMockResponse() {
  return {
    statusCode: null,
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.body = data;
      return this;
    }
  };
}

test("Une erreur de validation Mongoose renvoie 400", () => {
  const res = createMockResponse();
  const error = { name: "ValidationError" };

  handleError(res, error);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { message: "Données invalides" });
});

test("Une erreur CastError renvoie 400", () => {
  const res = createMockResponse();
  const error = { name: "CastError" };

  handleError(res, error);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { message: "Données invalides" });
});

test("Une erreur de doublon MongoDB renvoie 400", () => {
  const res = createMockResponse();
  const error = { code: 11000 };

  handleError(res, error);

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { message: "Données invalides" });
});

test("Une erreur technique inattendue renvoie 500", () => {
  const res = createMockResponse();
  const error = new Error("Erreur technique");

  handleError(res, error);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { message: "Erreur serveur" });
});