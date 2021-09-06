const { EJEMPLO_RESUELVE_FC } = require('../data/Players')
const { getSalaries } = require('../../src/services/PlayerService')
const assert = require("chai").assert

describe("Testing PlayerService", function() {
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

        
    }) 


})
