const {EJEMPLO_RESUELVE_FC } = require('../../data/Players')
const { TEAMS_EJEMPLO_RESUELVE_BD} = require('../../data/Teams')
const { getPerformance } = require('../commons/Operations')

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
        const perfomance = getPerformance(player.goles/player.meta)
        return {... player, alcance: perfomance }
    }
    return {...player}
}

const filterByMeta = element => {
    return element.meta !== undefined && element.meta !== null
}

const getFirstTeamPerfomance = player => {
    return {
        equipo: player.equipo,
        goles: player.goles,
        meta: player.meta,
        alcance: getPerformance(player.goles/player.meta)
    }
}

const getSuccessiveTeamPerformance = (player, teamPerformance) => {
    const goles = teamPerformance.goles + player.goles
    const meta = teamPerformance.meta + player.meta
    return {
        goles,
        meta,
        alcance: getPerformance(goles/meta),
        equipo: teamPerformance.equipo
    }
}

const getTeamsPerformanceByPlayer = (teamsPerformances, player) => {
    const teamPerformance = teamsPerformances[player.equipo]
    if(teamPerformance){
        teamsPerformances[player.equipo] = getSuccessiveTeamPerformance(player, teamPerformance)
    }else{
        teamsPerformances[player.equipo] = getFirstTeamPerfomance(player)
    }
    return teamsPerformances
}

const getTeamsPerformance = players => {
    return players.filter(filterByMeta)
    .reduce( getTeamsPerformanceByPlayer,{})
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
