const NOT_TYPE = 'is not of a type(s)';
const TIPO = 'no es de tipo';
const REQUIRED = 'is required';
const REQUERIDO = 'es requerido';
const INSTANCE = 'instance.';
const MIN_INTEGER = 'must have a minimum value of';
const MINIMO_VALOR = 'el valor mínimo es de';
const MIN_LONG = 'does not meet minimum length of';
const MINIMA_LONGITUD = 'puede ser de una longitud mínima de';
const GRATER_OR_EQUALS = 'must be greater than or equal to'
const MAYOR_IGUAL = 'debe ser mayor o igual a'

var translateMessages = errors => {
  var erroresFinal = [];
  errors.forEach((error) => {
    let mensaje = error.message.replace(NOT_TYPE, TIPO);
    mensaje = mensaje.replace(REQUIRED, REQUERIDO);
    mensaje = mensaje.replace(MIN_INTEGER, MINIMO_VALOR);
    mensaje = mensaje.replace(MIN_LONG, MINIMA_LONGITUD);
    mensaje = mensaje.replace(GRATER_OR_EQUALS, MAYOR_IGUAL);
    const campoFinal = error.property.replace(INSTANCE, '');
    const json = {
      campo: campoFinal,
      error: `El campo '${campoFinal}' ${mensaje}`,
    };
    erroresFinal.push(json);
  });
  return erroresFinal;
};

module.exports = { getMensajes: translateMessages  }