const Users = require('../models/user')

class UserService {
    async findUser(filter) {
        try {
            return await Users.findOne(filter) 
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async createUser(user) {
        try {
            return await Users.create(user)
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = new UserService()