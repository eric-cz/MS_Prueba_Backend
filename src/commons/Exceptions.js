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

    class NotAcceptable extends Error {
      constructor(message,errors) {
        super(message);
        this.name = this.constructor.name;
        this.errors = errors
        this.status = 406
        }
    }
    
  module.exports = {
    BadRequestException,
    NotFoundException,
    NotAcceptable
  }