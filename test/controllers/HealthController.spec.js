
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const app = require('../../src/app')
chai.use(chaiHttp)
const { CONTEXT_APP } = require('../../src/commons/Constants')


describe('Testing Health Controller',()=>{
    it('1. Verificar Mensaje', (done) => {
    chai.request(app).get(`${CONTEXT_APP}/`)
    .end( function(err,res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('mensaje', 'Microservicio en funcionamiento')
        expect(res.body).to.have.property('timestamp')
     })
     done()
   })

})