const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const app = require('../../src/app')
chai.use(chaiHttp)
const { CONTEXT_APP } = require('../../src/commons/Constants')
const { TEAM_TLAX_CONTROLLER, TEAM_CDMX_UPDATE_CONTROLLER, TEAM_CDMX_BD  } = require('../data/Teams')
const { initData, deleteData }  = require('../DB')


describe('Testing teamsController',()=>{

    before('Delete data in DB', async () => {
        await initData(TEAM_CDMX_BD)
    })

    after('Delete data in DB', async () => {
        await deleteData([...TEAM_CDMX_BD, TEAM_TLAX_CONTROLLER])
    }) 
    const cdmxName = TEAM_CDMX_UPDATE_CONTROLLER.nombreEquipo
    describe('1 Testing Get Team by name GET /teams/:id',()=>{
        it('1.1 Not Found', (done) => {
            chai.request(app).get(`${CONTEXT_APP}/teams/sinExistencia`)
            .end( function(err,res){
                expect(res).to.have.status(404)
                expect(res.body).to.have.property('mensaje','No existen resultados para su búsqueda')
                expect(res.body).to.have.property('errores','No existe configuración para el equipo: sinExistencia')
                done()
             })
           })
           it('1.2 Get TEAM CDMX', (done) => {
            chai.request(app).get(`${CONTEXT_APP}/teams/${cdmxName}`)
            .end( function(err,res){
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('nombreEquipo',cdmxName)
                done()
             })
           })
    })

    describe('2 Testing Update Team PUT /teams/:id',()=>{
        it('2.1 Not Found', (done) => {
            chai.request(app).put(`${CONTEXT_APP}/teams/sinExistencia`)
            .send(TEAM_CDMX_UPDATE_CONTROLLER)
            .end( function(err,res){
                expect(res).to.have.status(406)
                expect(res.body).to.have.property('mensaje','No se puede realizar la actualización')
                expect(res.body).to.have.property('errores','No existe configuración para el equipo: sinExistencia')
                done()
            })
           })
           it('2.2 BAD REQUEST', (done) => {
            chai.request(app).put(`${CONTEXT_APP}/teams/sinExistencia`)
            .send({})
            .end( function(err,res){
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('mensaje','La solicitud no cumple con una estrutura correcta')
                done()
             })
           })

           it('2.3 UPDATE CDMX', (done) => {
            chai.request(app).put(`${CONTEXT_APP}/teams/${cdmxName}`)
            .send(TEAM_CDMX_UPDATE_CONTROLLER)
            .end( function(err,res){
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('mensaje','Configuración actualizada correctemente')
                done()
             })
           })
    })

    describe('3 Testing Save Team POST /teams/',()=>{
        it('3.1 EXIST TEAM IN DB', (done) => {
            const tempTlax = {... TEAM_TLAX_CONTROLLER}
            tempTlax.nombreEquipo = cdmxName
            chai.request(app).post(`${CONTEXT_APP}/teams`)
            .send(tempTlax)
            .end( function(err,res){
                expect(res).to.have.status(406)
                expect(res.body).to.have.property('mensaje','No se puede guardar el elemento')
                expect(res.body).to.have.property('errores','El equipo CDMX FC ya tiene una configuración almacenda')
                done()
            })
           })
           it('3.2 BAD REQUEST', (done) => {
            chai.request(app).post(`${CONTEXT_APP}/teams`)
            .send({})
            .end( function(err,res){
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('mensaje','La solicitud no cumple con una estrutura correcta')
                done()
             })
           })

           it('3.3 Save TLAX', (done) => {
            chai.request(app).post(`${CONTEXT_APP}/teams`)
            .send(TEAM_TLAX_CONTROLLER)
            .end( function(err,res){
                expect(res).to.have.status(201)
                console.log(res.body)
              //  expect(res.body).to.have.property('mensaje','Configuración actualizada correctemente')
                done()
             })
           })
    })
})


