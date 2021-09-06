
const handlerError = (res, e) => {
    let statusCode = e.status
    if(!statusCode){
      statusCode = 500
    }

    const result = {
        timestamp: new Date().getTime(),
        mensaje: e.message,
        errores: e.errors,
        
    }
    return res.status(statusCode).jsonp(result)

  }

  module.exports = { handlerError }