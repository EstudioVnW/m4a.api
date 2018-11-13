const ErrorResponse = {
  formatError: (err) => {
  	if (err.name === 'SequelizeUniqueConstraintError') {
  		return {
  			status: 409,
        message: 'Some values must be uniques',
        details: {
  			  name: err.name,
          err: err.errors
        }
  		}
  	}
    return {
      status: 500,
      name: err.name,	
      errors: err.errors
    };
  }
};

module.exports = ErrorResponse;