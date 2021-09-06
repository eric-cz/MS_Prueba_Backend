const {EJEMPLO_RESUELVE_FC } = require('../../data/Players')
const { TEAMS_EJEMPLO_RESUELVE_BD} = require('../../data/Teams')
const { getPerformance } = require('../commons/Operations')
const { getTeamsPerformance } = require('./TeamService')

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
        const perfomance = getPerformance(player.goles,player.meta)
        return {... player, alcance: perfomance }
    }
    return {...player}
}

const getSalaries = players => {
    const playersWithPerformance = players
        .map(player => getPlayerObjective(player, TEAMS_EJEMPLO_RESUELVE_BD))
        .map(getPlayerPerformance)
    const teamsPerformance = getTeamsPerformance(playersWithPerformance)
    console.log(playersWithPerformance)
    console.log(teamsPerformance)

}

module.exports = {
    getSalaries
  }


getSalaries(EJEMPLO_RESUELVE_FC.jugadores)
