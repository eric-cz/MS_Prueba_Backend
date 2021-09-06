const level = require('level')

const database = level('resuelvedb', {valueEncoding: 'json'})

module.exports = database;
