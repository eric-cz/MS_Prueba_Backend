const Validator = require("jsonschema").Validator;

var validatorSchema = new Validator();
const TYPE_STRING_REQ = { type: "string", required: true };
const TYPE_INTEGER_NO_REQ_MIN = { type: "integer", minimum: 0 };
const TYPE_INTEGER_REQ_MIN = { type: "integer", minimum: 0, required: true };

const requestPlayers = {
  id: "/requestPlayers",
  type: "object",
  properties: {
    jugadores: {
      type: "array",
      minItems: 1,
      items: { $ref: "/player" },
      required: true,
    }
  }
}

const player = {
  id: "/player",
  type: "object",
  properties: {
    nombre: TYPE_STRING_REQ,
    nivel: TYPE_STRING_REQ,
    goles:  TYPE_INTEGER_REQ_MIN,
    sueldo: TYPE_INTEGER_REQ_MIN,
    bono: TYPE_INTEGER_REQ_MIN,
    equipo: TYPE_STRING_REQ,
    goles_minimos: TYPE_INTEGER_NO_REQ_MIN
  }
}

const team = {
  id: "/team",
  type: "object",
  properties: {
    nombreEquipo: TYPE_STRING_REQ,
    meta: {
      type: "array",
      minItems: 1,
      items: { $ref: "/nivel" },
      required: true,
    }
  }
}

validatorSchema.addSchema(player, "/player")
validatorSchema.addSchema(requestPlayers, "/requestPlayers")


module.exports = {
  validatorSchema,
  requestPlayers
}