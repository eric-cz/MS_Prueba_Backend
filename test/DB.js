const { batchConfig } = require('../src/dao/TeamDao') 

const initData = async (arrayConfig) => {
  const options = arrayConfig.map( config => {
        return {
            type: 'put',
            key: config.nombreEquipo,
            value: config
        }
     } 
    )
     await batchConfig(options)
}

const deleteData = async elements => {
    const options = elements.map( config => {
        return {
            type: 'del',
            key: config.nombreEquipo
        }
    })
    await batchConfig(options)
}

module.exports = {
    initData,
    deleteData
}