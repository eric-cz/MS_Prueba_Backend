const { greeting } = require('../services/HealthService')
const LOGGER = require('../commons/Logger')


const getHealth = (req, res) => {
    LOGGER.info(`Iniciando verificación de microservicio`)
    const result = greeting()
    return res.status(200).send(result)    
  }
    
  module.exports = { getHealth }
  