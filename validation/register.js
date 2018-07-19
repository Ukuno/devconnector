const Validator = require('validator'),
        isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';


    if(!Validator.isLength(data.name, { min: 2 , max: 20})) {
        errors.name = 'The length for a name should be between 2 to 20 characters';
    }
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name can\'t be empty';
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };
};

