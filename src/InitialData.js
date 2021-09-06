const LOGGER = require('./commons/Logger')
const { batchConfig} = require('./dao/TeamDao')
const data = require('../data/initialData.json');

const getUploadConfig = arrayConfig => {
    return arrayConfig.map( config => {
        return {
            type: 'put',
            key: config.nombreEquipo,
            value: config
        }
    } )
}

batchConfig(getUploadConfig(data)).then( () => 
    LOGGER.debug('Carga inicial correcta')
    ).catch( error => 
        LOGGER.error(error)
)
