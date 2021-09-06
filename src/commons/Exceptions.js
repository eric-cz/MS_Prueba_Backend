class BadRequestException extends Error {
  constructor(message,errors) {
    super(message);
    this.name = this.constructor.name;
    this.errors = errors
    this.status = 400
    }
  }

  class NotFoundException extends Error {
    constructor(message,errors) {
      super(message);
      this.name = this.constructor.name;
      this.errors = errors
      this.status = 404
     }
    }
    
  module.exports = {
    BadRequestException,
    NotFoundException
  }