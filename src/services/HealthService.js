
const greeting = () => {
    return {
        timestamp: new Date().getTime(),
        mensaje: 'Microservicio en funcionamiento'
    }
}

module.exports = {
    greeting
  }
