const { getSalaries } = require('../services/PlayerService')
const LOGGER = require('../commons/Logger')
const { handlerError } = require('../commons/HandlerException')
const { validatePlayersJson } = require('../commons/validation/Validator')

const getPlayersSalary = async (req, res) => { 
    LOGGER.info(`Player Controller get Salaries`)
    const body = req.body
    try {
        validatePlayersJson(body)
        const salaries = await getSalaries(body.jugadores)
        const result = { jugadores : salaries}
        return res.status(200).send(result) 
      } catch (error) {
        handlerError(res, error)
      }   
  }

  module.exports = { getPlayersSalary }
