const route = require('express').Router()
const { getHealth } = require('../controllers/HealthController')
const { getPlayersSalary } = require('../controllers/PlayerController')
const { getTeam, updateTeam, saveTeam } = require('../controllers/TeamController')

route.route('/')
      .get(getHealth)

route.route('/players/salaries')
      .post(getPlayersSalary)

route.route('/teams')
      .post(saveTeam)

route.route('/teams/:teamName')
      .get(getTeam)
      .put(updateTeam)


module.exports = route