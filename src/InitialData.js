const LOGGER = require('./commons/Logger')
const { getTeamConfig, batchConfig} = require('./dao/TeamDao')

const resuelve = {
    "nombreEquipo": "azul",
    "meta": {
        "A": 7,
        "B": 11,
        "C": 18,
        "Cristiano": 45
    }
}

async function pruebaBB(){
    const config = [{
        type: 'put',
        key: resuelve.nombreEquipo,
        value: resuelve
    }]
    await batchConfig(config)
    const teamFromBD = await getTeamConfig(resuelve.nombreEquipo)
    LOGGER.info(teamFromBD)
}

pruebaBB().then( () => 
    LOGGER.debug('Carga inicial correcta')
).catch( error => 
    LOGGER.error(error)
)