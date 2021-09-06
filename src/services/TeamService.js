const { getPerformance } = require('../commons/Operations')

const filterByMeta = element => {
    return element.goles_minimos !== undefined && element.goles_minimos !== null
}

const getFirstTeamPerfomance = player => {
    return {
        equipo: player.equipo,
        goles: player.goles,
        goles_minimos: player.goles_minimos,
        alcance: getPerformance(player.goles,player.goles_minimos)
    }
}

const getSuccessiveTeamPerformance = (player, teamPerformance) => {
    const goles = teamPerformance.goles + player.goles
    const goles_minimos = teamPerformance.goles_minimos + player.goles_minimos
    return {
        goles,
        goles_minimos,
        alcance: getPerformance(goles,goles_minimos),
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