const express = require('express')
const LOGGER = require('./commons/Logger')
const app = express()
const { PORT, CONTEXT_APP} = require('./commons/Constants')
const route = require('./routes/route')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(CONTEXT_APP, route)
app.listen(PORT, () => {
    LOGGER.info(`server running on ${PORT}${CONTEXT_APP}`)
})
    
module.exports = app