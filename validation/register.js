const Validator = require('validator'),
        isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';


    if(!Validator.isLength(data.name, { min: 2 , max: 20})) {
        errors.name = 'The length for a name should be between 2 to 20 characters';
    }
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name can\'t be empty';
    }
    if(!Validator.isEmail(data.email)){
        errors.email = 'invalid email'
    }
    if(Validator.isEmpty(data.email)){
        errors.email = " Email is required";
    }
    
    if(Validator.isEmpty(data.password)) {
        errors.password = " password is empty";
    }
    if(!Validator.isLength(data.password, {min : 6, max : 20})){
        errors.password = " password can't be less that 6 characters and greater than 20";
    }
    if(Validator.isEmpty(data.confirmPassword)){
        errors.confirmPassword = " Confirmation password is required";
    }
    if(!Validator.equals(data.password , data.confirmPassword)){
        errors.confirmPassword = " Passwords dont match";
    }

    return {
        errors,
        isValid : isEmpty(errors)
    };
};

