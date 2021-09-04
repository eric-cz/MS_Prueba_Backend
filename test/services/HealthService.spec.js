
const expect = require('chai').expect
const { greeting } = require('../../src/services/HealthService')

describe("Test Health Service", function() {

    it("1.1 Test player with no config in DB",  function() {
        const response =  greeting()
        expect(response).to.have.property('mensaje', 'Microservicio en funcionamiento')
        expect(response).to.have.property('timestamp')
    })
})