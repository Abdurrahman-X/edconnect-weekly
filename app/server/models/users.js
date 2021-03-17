const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;

    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }
}

class Users extends DataModel {
    authenticate(email, password) {
       // This should return true if the email and password combination is valid and false otherwise
        let validUser = this.data.find(item => item.email === email && item.password === password);
        return validUser ? true : false;
    }

    getByEmail(email) {
        // This should return the User object with the specified email address if such a user is found
        // This should return null if no user with the specified email address is found
        let userMail = this.data.find(obj => obj.email === email);
        return userMail ? userMail : null;
    }

    getByMatricNumber(matricNumber) {
        // This should return the User object with the specified matric number if such a user is found
        // This should return null if no user with the specified matric number is found
        let userMatric = this.data.find(obj => obj.matricNumber === matricNumber);
        return userMatric ? userMatric : null;
    }

    validate(obj) {
        // validations :
        // Validate that the none of the provided properties are empty
        // Validate that no user in the data array already has the specified email address
        // Validate that no user in the data array already has the specified matric number
        // Validate that the password is at least 7 characters in length
        // The method should return true if all of the tests pass and false otherwise
        
        let value = false;
        
        for (var key in obj) {
            if (obj[key] !== null ||  obj[key] !== "" || obj[key] !== undefined)
            value = true;
        }
        
        let passCheck = obj.password.length >= 7;
        let matriCheck = this.data.find(item => item.matricNumber === obj.matricNumber);
        let emailCheck = this.data.find(item => item.email === obj.email); 

        if (value && passCheck && !matriCheck && !emailCheck) {
            return true;
        } else {
            return false;
        }
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};