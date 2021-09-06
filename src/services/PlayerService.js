const {EJEMPLO_RESUELVE_FC } = require('../../data/Players')
const { TEAMS_EJEMPLO_RESUELVE_BD} = require('../../data/Teams')

const getObjectiveByLevel = (configTeam, level) => {
    if(level)
     return configTeam[level]
    return null
}

const getPlayerObjective = (player, teams) => {
    const teamGoals = teams[player.equipo]
    if(teamGoals){
        return { ...player, meta: getObjectiveByLevel(teamGoals.meta, player.nivel)}
    }
    return {...player}
}

const getPlayerPerformance = player => {
    if(player.meta){
        const perfomance = (player.goles/player.meta) * 100
        return {... player, alcance: perfomance }
    }
    return {...player}
}

const getSalaries = players => {
    const playersWithPerformance = players
        .map(player => getPlayerObjective(player, TEAMS_EJEMPLO_RESUELVE_BD))
        .map(getPlayerPerformance)
    console.log(playersWithPerformance)
}

module.exports = {
    getSalaries
  }


getSalaries(EJEMPLO_RESUELVE_FC.jugadores)
