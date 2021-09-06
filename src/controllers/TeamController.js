const LOGGER = require('../commons/Logger')
const { getConfig, saveConfig, updateConfig } = require('../services/TeamService')
const { handlerError } = require('../commons/HandlerException') 
const { validateTeamJson } = require('../commons/validation/Validator')
/**
 * Obtiene la configuración del equipo por nombre de equiṕo
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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
    
const updateTeam = async(req, res) => { 
  LOGGER.info(`Team Controller updateTeam`)
  const { teamName } = req.params;
  try {
    validateTeamJson(req.body)
    await updateConfig(teamName, req.body)
    return res.status(200).send({ mensaje: 'Configuración actualizada correctemente'})    
  } catch (error) {
    handlerError(res, error)
  }
}

const saveTeam = async(req, res) => { 
  LOGGER.info(`Team Controller saveTeam`)
  try {
    validateTeamJson(req.body)
    await saveConfig(req.body)
    return res.status(201).send({ mensaje: 'Configuración creada correctemente'})  
  } catch (error) {
    handlerError(res, error)
  }
}
  
module.exports = { getTeam, updateTeam, saveTeam }
  