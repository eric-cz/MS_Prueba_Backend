/**
 * Constantes de logs
 */
 exports.NAME_APP_LOG = "ms_salarios"
 exports.PATH_APP_LOG = "./logs"
 exports.ELEMENT_APP_LOG = "ms-salarios"
 exports.PATH_FILE_APP_LOG = "/ms-salrios.log"


 exports.PORT = process.env.PORT || 9030
 const CONTEXT_NAME =  process.env.CONTEXT_NAME || `ms-salarios`
 exports.CONTEXT_APP = `/${CONTEXT_NAME}`
