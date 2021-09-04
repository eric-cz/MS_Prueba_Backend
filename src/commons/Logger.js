const {PATH_FILE_APP_LOG,PATH_APP_LOG, ELEMENT_APP_LOG, NAME_APP_LOG} = require('./Constants')
const log4JS = require('log4js')

log4JS.configure({
    appenders: {
        [NAME_APP_LOG]: {
            type: 'stdout'
        },
        [ELEMENT_APP_LOG]: {
            type: 'file',
            filename: PATH_APP_LOG + PATH_FILE_APP_LOG
        }
    },
    categories: {
        default: {
            appenders: [NAME_APP_LOG, ELEMENT_APP_LOG],
            level: 'info'
         }
    }
})
const LOGGER = log4JS.getLogger(NAME_APP_LOG)
LOGGER.level = process.env.LOG_LEVEL || 'info'

module.exports = LOGGER