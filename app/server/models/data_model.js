class DataModel {
    constructor() {
        this.data = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        // This should return the object with the specified id if such an object exists
        // This should return null if no object with the specified id was found
        let user = this.data.find(obj => {
            return obj.id === id;
        });
        // return obj.id === id;
        return user ? user : null;
    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
            // The update method updates the properties of an object in the data array with the specified id
            // This should return true if an object with the specified id was found
            // This should return false if no object with the specified id was found in the data array
        
        let updateUser = this.data.find(item => item.id === id);
        if (updateUser) {
            for (var key in obj) {
                updateUser[key] = obj[key];
            }
            return true;
        }
        return false;
    }

    delete(id) {
        // The delete method deletes the object with the specified id
        // This should return true if an object with the specified id was found in the array and deleted
        // This should return false if no object with the specified id was found
        let deleteUser = this.data.find(item => item.id === id);
        let index = this.data.indexOf(deleteUser);
        if (deleteUser) {
            this.data.splice(index, 1);
            return true
        }
        return false;
    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;