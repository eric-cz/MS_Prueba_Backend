const LOGGER = require('../commons/Logger')
const database = require('../commons/Database')

const saveTeamConfig = async team => {
    LOGGER.info(`Starting saveTeamConfig`)
    await database.put(team.nombreEquipo, team)
    LOGGER.info(`Finishing saveTeamConfig`)
}

const getTeamConfig = teamName => {
    LOGGER.info(`Starting getTeamConfig: ${teamName}`)
    const team = database.get(teamName)
    LOGGER.info(`Ending getTeamConfig: ${teamName}`)
    return team
}

const batchConfig = async options => {
    LOGGER.info(`Starting batchConfig`)
    await database.batch(options)
    LOGGER.info(`Finishing batchConfig`)
}

module.exports = { saveTeamConfig, getTeamConfig , batchConfig}
