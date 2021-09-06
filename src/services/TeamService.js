const { getTeamsConfigByKeys, getTeamConfig, saveTeamConfig } = require('../dao/TeamDao')
const { getPerformance } = require('../commons/Operations')
const { NotFoundException , NotAcceptable} = require('../commons/Exceptions')

/**
 * Se construye JSON para presentar en la consulta
 * @returns 
 */
const getConfigUser = teamDB => {
    const goles_minimos = []
    for (const [nivel, goles] of Object.entries(teamDB.meta)) {
        goles_minimos.push({nivel, goles})
    }
    return { 
        nombreEquipo: teamDB.nombreEquipo,
        goles_minimos    
    }
}

/**
 * Se construye JSOn para guardar en la BD
 * @param {*} team 
 * @returns 
 */
const getConfigDB = team => {
    const goals = team.goles_minimos.reduce((previous, accum) => {
         previous[accum.nivel] = accum.goles
         return previous
     },{})
     return {
         nombreEquipo: team.nombreEquipo,
         meta: goals
     }
 }

const filterByMeta = element => {
    return element.goles_minimos !== undefined && element.goles_minimos !== null
}
/**
 * Se obtiene el alcannce de un solo jugador (el primero)
 * @param {*} player 
 * @returns 
 */
const getFirstTeamPerfomance = player => {
    return {
        equipo: player.equipo,
        goles: player.goles,
        goles_minimos: player.goles_minimos,
        alcance: getPerformance(player.goles,player.goles_minimos)
    }
}
/**
 * Se obtiene el alcance del equipo, cuando el equipo ya tiene goles y minimo de goles guardados previamente
 * @param {*} player 
 * @param {*} teamPerformance 
 * @returns 
 */
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


/**
 * Se obtiene el alcance de los equipos mediante una lista de jugadores con goles y minimo de goles
 * @param {*} players 
 * @returns 
 */
const getTeamsPerformance = players => {
    return players.filter(filterByMeta)
    .reduce( getTeamsPerformanceByPlayer,{})
}

const addNameTeamFromPlayer = (teams, player) => {
    if(player.equipo)
        teams.add(player.equipo)
    return teams
}

/**
 * Obtienen los nombres de los equipos de una lista de jugadores
 * @param {*} players 
 * @returns 
 */
const getNameTeamsFromPlayers = players => {
   const teams = players.reduce(addNameTeamFromPlayer,new Set());
   return Array.from(teams);
}
/**
 * Se obtienen los equiṕos de la BD
 * @param {*} teamNames 
 * @returns 
 */
const getTeamsByTeamNames = async teamNames => {
    return (await getTeamsConfigByKeys(teamNames))
    .reduce( (accum, current ) => {
        if(current){
            accum[current.nombreEquipo] = current.meta
        }
        return accum
    } ,{})
}

/**
 * Se obtiene la configuración de un quipo por su nombre
 * @param {*} teamName 
 * @returns 
 */
const getConfig = async teamName => {
    const config = await getTeamConfig(teamName)
    if(!config)
       throw new NotFoundException('No existen resultados para su búsqueda',`No existe configuración para el equipo: ${teamName}`)
   return getConfigUser(config)
}

/**
 * Se guarda una nueva configuración de un equiṕo
 * @param {*} team 
 */
const saveConfig = async team => {
    const config = await getTeamConfig(team.nombreEquipo)
    if(config)
        throw new NotAcceptable(`No se puede guardar el elemento`,`El equipo ${team.nombreEquipo} ya tiene una configuración almacenda`)
    const configDB = getConfigDB(team)
    await saveTeamConfig(configDB)
}

/**
 * Se actualiza la configuración de un equipo
 * @param {*} teamName 
 * @param {*} team 
 */
const updateConfig = async (teamName, team) => {
    const config = await getTeamConfig(teamName)
    if(!config)
        throw new NotAcceptable(`No se puede realizar la actualización`,`No existe configuración para el equipo: ${teamName}`)
    team.nombreEquipo = teamName
    const configDB = getConfigDB(team)
    await saveTeamConfig(configDB)
}

module.exports = {
    getTeamsPerformance,
    getNameTeamsFromPlayers,
    getTeamsByTeamNames,
    getConfig,
    saveConfig,
    updateConfig
}