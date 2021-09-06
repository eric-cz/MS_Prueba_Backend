const { EJEMPLO_RESUELVE_FC, EJEMPLO_ROJO_AZUL, CHIAPAS_PLAYERS, YUCATAN_PLAYERS } = require('../data/Players')
const { getSalaries } = require('../../src/services/PlayerService')
const assert = require("chai").assert
const {initData, deleteData} = require('../DB')
const { TEAMS_EJEMPLO_RESUELVE_BD} = require('../data/Teams')

describe("Testing PlayerService", function() {

    before('Inidt data in DB', async () => {
        await  initData(TEAMS_EJEMPLO_RESUELVE_BD)
     })
   
     after('Delete data in DB', async () => {
         await deleteData(TEAMS_EJEMPLO_RESUELVE_BD)
     }) 

    describe("1. getSalaries", function() {
        it("1.1 Test Resuelve FC ", async function() {
            const playersSalary = await getSalaries(EJEMPLO_RESUELVE_FC.jugadores)
            assert.equal(EJEMPLO_RESUELVE_FC.jugadores.length, playersSalary.length)
            assert.isNotNull( playersSalary[0].sueldo_completo)
            assert.isNotNull( playersSalary[1].sueldo_completo)
            assert.isNotNull( playersSalary[2].sueldo_completo)
            assert.isNotNull( playersSalary[3].sueldo_completo)
            const luis = playersSalary[3]
            assert.equal( 59550, luis.sueldo_completo)
        })
        it("1.2 Test el Rulo equipo rojo  ", async function() {
            const playersSalary = await getSalaries(EJEMPLO_ROJO_AZUL.jugadores)
            assert.equal(EJEMPLO_ROJO_AZUL.jugadores.length, playersSalary.length)
            assert.isNotNull( playersSalary[0].sueldo_completo)
            assert.isNotNull( playersSalary[1].sueldo_completo)
            assert.isNotNull( playersSalary[2].sueldo_completo)
            assert.isNotNull( playersSalary[3].sueldo_completo)
            const rulo = playersSalary[3]
            assert.equal( 42450, rulo.sueldo_completo)
        })
        it("1.3 Test jugadores sin configuración ", async function() {
            const playersSalary = await getSalaries(CHIAPAS_PLAYERS)
            assert.equal(CHIAPAS_PLAYERS.length, playersSalary.length)
            assert.isNull(playersSalary[0].sueldo_completo)
        })

        it("1.4 Test jugadores  distintos equipos con meta en el JSON y sin configuración en BD", async function() {
            const playersSalary = await getSalaries(YUCATAN_PLAYERS)
            assert.equal(YUCATAN_PLAYERS.length, playersSalary.length)
            assert.isNotNull(playersSalary[0].sueldo_completo)
        })

        it("1.5 Test mandar arreglo sin elementos  ", async function() {
            const playersSalary = await getSalaries([])
            assert.equal(0, playersSalary.length)
        })

    }) 

})
