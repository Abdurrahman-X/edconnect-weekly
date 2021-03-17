const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
        // validations :
        // The authors and tags properties are arrays
        // Validate that the none of the provided properties are empty
        // The method should return true if all of the tests pass and false otherwise
        let isAuthorsArray = Array.isArray(obj.authors); 
        let isTagsArray = Array.isArray(obj.tags);

        let value = true;
        for (var key in obj) {
            if (!obj[key] || obj[key] === null || obj[key] === "") {
                value = false;
            }
        }
        if (value && isAuthorsArray && isTagsArray) {
            return true;
        } 
        return false;
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};