const { TEAMS_EJEMPLO_RESUELVE_BD} = require('../../data/Teams')
const { getPerformance, getSalary, getBonus, getAveragePerformance } = require('../commons/Operations')
const { getTeamsPerformance } = require('./TeamService')
/**
 * Se obtiene el minimo de goles por nivel
 * @param {*} configTeam 
 * @param {*} level 
 * @returns 
 */
const getObjectiveByLevel = (configTeam, level) => {
    if(level)
     return configTeam[level]
    return null
}

/**
 * Se obtiene el minimo de goles de un jugador
 * @param {*} player 
 * @param {*} teams 
 * @returns 
 */
const getPlayerObjective = (player, teams) => {
    const teamGoals = teams[player.equipo]
    if(teamGoals){
        return { ...player, meta: getObjectiveByLevel(teamGoals.meta, player.nivel)}
    }
    return {...player}
}
/**
 * Se obtiene el alcance del jugador
 * @param {*} player 
 * @returns 
 */
const getPlayerPerformance = player => {
    if(player.meta){
        const perfomance = getPerformance(player.goles,player.meta)
        return {... player, alcance: perfomance }
    }
    return {...player}
}

/**
 * Se envia el alcance del equipo al jugador
 * @param {*} player 
 * @param {*} teamsPerformance 
 * @returns 
 */
const setTeamPerformanceToPlayer = (player, teamsPerformance) => {
    const teamPerformance = teamsPerformance[player.equipo]
    if(teamPerformance){
        return { ...player, alcanceEquipo: teamPerformance.alcance }
    }
    return {...player}
}
/**
 * Se obtiene el sueldo completo del jugador
 * @param {*} player 
 * @returns 
 */
const getFinalSalary = player => {
    if(player.alcance && player.alcanceEquipo){
        const performance =  getAveragePerformance(player.alcance, player.alcanceEquipo)
        const bonus = getBonus(player.bono, performance)
        const salary = getSalary(player.sueldo, bonus)
        return {... player, sueldo_completo : salary}
    }
    return { ...player, sueldo_completo: null }
}

/**
 * Se obtiene el salario completo de una lista de jugadores
 * @param {*} players 
 * @returns 
 */
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
