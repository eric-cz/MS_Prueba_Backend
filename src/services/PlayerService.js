const { TEAMS_EJEMPLO_RESUELVE_BD} = require('../../data/Teams')
const { getPerformance, getSalary, getBonus, getAveragePerformance } = require('../commons/Operations')
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

const setTeamPerformanceToPlayer = (player, teamsPerformance) => {
    const teamPerformance = teamsPerformance[player.equipo]
    if(teamPerformance){
        return { ...player, alcanceEquipo: teamPerformance.alcance }
    }
    return {...player}
}

const getFinalSalary = player => {
    if(player.alcance && player.alcanceEquipo){
        const performance =  getAveragePerformance(player.alcance, player.alcanceEquipo)
        const bonus = getBonus(player.bono, performance)
        const salary = getSalary(player.sueldo, bonus)
        return {... player, sueldo_completo : salary}
    }
    return { ...player, sueldo_completo: null }
}

const getSalaries = players => {
    const playersWithPerformance = players
        .map(player => getPlayerObjective(player, TEAMS_EJEMPLO_RESUELVE_BD))
        .map(getPlayerPerformance)
    const teamsPerformance = getTeamsPerformance(playersWithPerformance)
    return playersWithPerformance
    .map(player => setTeamPerformanceToPlayer(player, teamsPerformance))
    .map(getFinalSalary)
}

module.exports = {
    getSalaries
  }
