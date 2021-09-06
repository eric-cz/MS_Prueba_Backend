const route = require('express').Router()
const {getHealth} = require('../controllers/HealthController')
const {getPlayersSalary} = require('../controllers/PlayerController')

route.route('/')
      .get(getHealth)

route.route('/players/salaries')
      .post(getPlayersSalary)

module.exports = route