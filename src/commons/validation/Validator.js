const { BadRequestException  } = require("../Exceptions")
const ValidatorUtil = require("./Schemes")
const { getMensajes } = require("./Message")

const handlerErrorValidation = (validation) => {
  if (validation.errors.length) {
    const message = getMensajes(validation.errors)
    throw new BadRequestException(`La solicitud no cumple con una estrutura correcta`,message)
  }
}

const validateJson = (data, schemaValidator) => {
  let validation = ValidatorUtil.validatorSchema.validate(data, schemaValidator)
  handlerErrorValidation(validation)
}

const validatePlayersJson = data => {
  validateJson(data, ValidatorUtil.requestPlayers)
} 

module.exports = {
  validatePlayersJson
}
