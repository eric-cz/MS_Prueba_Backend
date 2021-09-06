const { getTeamsConfigByKeys, getTeamConfig } = require('../dao/TeamDao')
const { getPerformance } = require('../commons/Operations')
const { NotFoundException } = require('../commons/Exceptions')

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

const addNameTeamFromPlayer = (teams, player) => {
    if(player.equipo)
        teams.add(player.equipo)
    return teams
}

const getNameTeamsFromPlayers = players => {
   const teams = players.reduce(addNameTeamFromPlayer,new Set());
   return Array.from(teams);
}

const getTeamsByTeamNames = async teamNames => {
    return (await getTeamsConfigByKeys(teamNames))
    .reduce( (accum, current ) => {
        if(current){
            accum[current.nombreEquipo] = current.meta
        }
        return accum
    } ,{})
}

const getConfig = async teamName => {
    const config = await getTeamConfig(teamName)
    if(!config)
       throw new NotFoundException('No existen resultados para su búsqueda',`No existe configuración para el equipo: ${teamName}`)
   return config
}

module.exports = {
    getTeamsPerformance,
    getNameTeamsFromPlayers,
    getTeamsByTeamNames,
    getConfig
}