const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    if(!Validator.isLength(data.name, { min: 2 , max: 20})) {
        errors.name = 'The length for a name should be between 2 to 20 characters';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };
};

