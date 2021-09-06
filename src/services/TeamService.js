const { getPerformance } = require('../commons/Operations')

const filterByMeta = element => {
    return element.meta !== undefined && element.meta !== null
}

const getFirstTeamPerfomance = player => {
    return {
        equipo: player.equipo,
        goles: player.goles,
        meta: player.meta,
        alcance: getPerformance(player.goles,player.meta)
    }
}

const getSuccessiveTeamPerformance = (player, teamPerformance) => {
    const goles = teamPerformance.goles + player.goles
    const meta = teamPerformance.meta + player.meta
    return {
        goles,
        meta,
        alcance: getPerformance(goles,meta),
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

module.exports = {
    getTeamsPerformance
}