
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const app = require('../../src/app')
chai.use(chaiHttp)
const { CONTEXT_APP } = require('../../src/commons/Constants')
const { EJEMPLO_RESUELVE_FC, EJEMPLO_ROJO_AZUL } = require('../data/Players')


describe('Testing POST /players/salaries',()=>{
   it('1. Calcular salario El Rulo', (done) => {
    chai.request(app).post(`${CONTEXT_APP}/players/salaries`)
    .send(EJEMPLO_ROJO_AZUL)
    .end( function(err,res){
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('jugadores')
        expect(res.body.jugadores).to.have.lengthOf(EJEMPLO_ROJO_AZUL.jugadores.length)
        const elRulo = res.body.jugadores.find( x => x.nombre === 'El Rulo')
        expect(elRulo.sueldo_completo).to.equal(42450)
        done()
     })
   })
   
   it('2. Calcular salario Luis Resuelve FC', (done) => {
    chai.request(app).post(`${CONTEXT_APP}/players/salaries`)
    .send(EJEMPLO_RESUELVE_FC)
    .end( function(err,res){
        expect(res).to.have.status(200)
        expect(res.body).to.have.property('jugadores')
        expect(res.body.jugadores).to.have.lengthOf(EJEMPLO_RESUELVE_FC.jugadores.length)
        const luis = res.body.jugadores.find( x => x.nombre === 'Luis')
        expect(luis.sueldo_completo).to.equal(59550)
        done()
     })
   })

   it('3. Error de estructura', (done) => {
    chai.request(app).post(`${CONTEXT_APP}/players/salaries`)
    .send({})
    .end( function(err,res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('mensaje', 'La solicitud no cumple con una estrutura correcta')
        expect(res.body).to.have.property('errores')
     })
     chai.request(app).post(`${CONTEXT_APP}/players/salaries`)
     .send({jugadores : {}})
     .end( function(err,res){
         expect(res).to.have.status(400);
         expect(res.body).to.have.property('mensaje', 'La solicitud no cumple con una estrutura correcta')
         expect(res.body).to.have.property('errores')
      })
      chai.request(app).post(`${CONTEXT_APP}/players/salaries`)
     .send({jugadores : []})
     .end( function(err,res){
         expect(res).to.have.status(400);
         expect(res.body).to.have.property('mensaje', 'La solicitud no cumple con una estrutura correcta')
         expect(res.body).to.have.property('errores')

      })
      chai.request(app).post(`${CONTEXT_APP}/players/salaries`)
      .send({jugadores : [{}]})
      .end( function(err,res){
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('mensaje', 'La solicitud no cumple con una estrutura correcta')
          expect(res.body).to.have.property('errores')

       })
      chai.request(app).post(`${CONTEXT_APP}/players/salaries`)
      .send({jugadores : 'jugadores'})
      .end( function(err,res){
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('mensaje', 'La solicitud no cumple con una estrutura correcta')
        expect(res.body).to.have.property('errores')
        done()
     })
   })

})