const { getSalaries } = require('../services/PlayerService')
const LOGGER = require('../commons/Logger')

const getPlayersSalary = (req, res) => { 
    LOGGER.info(`Player Controller get Salaries`)
    const body = req.body
    const salaries =  getSalaries(body.jugadores)
    const result = { jugadores : salaries}
    return res.status(200).send(result)        
  }

  module.exports = { getPlayersSalary }
