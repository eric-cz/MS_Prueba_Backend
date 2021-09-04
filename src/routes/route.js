const route = require('express').Router()
const {getHealth} = require('../controllers/HealthController')

route.route('/')
      .get(getHealth)

module.exports = route