const { getSalaries } = require('../services/PlayerService')

const getPlayersSalary = async(req, res) => { 
    LOGGER.info(`Player Controller get Salaries`)
    const body = req.body
    const salaries = await getSalaries(body.jugadores)
    const result = { jugadores : salaries}
    return res.status(200).send(result)        
  }

  module.exports = { getPlayersSalary }
