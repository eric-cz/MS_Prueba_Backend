const LOGGER = require('../commons/Logger')
const { getConfig } = require('../services/TeamService')
const { handlerError } = require('../commons/HandlerException') 
const { validateTeamJson } = require('../commons/validation/Validator')

const getTeam = async(req, res) => { 
  LOGGER.info(`Team Controller getTeam`)
  const { teamName } = req.params
  try {
      const result = await getConfig(teamName)
      return res.status(200).send(result)    
  } catch (error) {
    handlerError(res, error)
  }
}
    
module.exports = { getTeam }
  