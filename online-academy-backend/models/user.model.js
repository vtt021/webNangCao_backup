const db = require('../utils/db');

const TABLE_NAME = 'users';

module.exports = {
    async getAllUsers() {
        return db(TABLE_NAME);
    },

    async getUserById(id) {
        const users = await db(TABLE_NAME)
        .where('id', id);

        if (users.length === 0) {
            return null;
        }

        return users[0];
    },

    async getUserByEmail(email) {
        const users = await db(TABLE_NAME)
        .where('email', email);

        if (users.length === 0) {
            return null;
        }

        return users[0];
    },

    async addUser(user) {
        return db(TABLE_NAME).insert(user);
    },

    update(id, user) {
        delete user.password;
        return db('users').where({id : id}).update(user);
    },

    updatePassword(id, pass) {
        return db('users').where({id : id}).update({
            password: pass
        });
    },

    delete(id) {
        return db('users').where({id : id}).del();
    },

    patchRFToken(id, refreshToken) {
        return db(TABLE_NAME).where('id', id).update('refreshToken', refreshToken);
    },

    async isValidRefreshToken(id, refreshToken) {
        const list = await db(TABLE_NAME).where('id', id).andWhere('refreshToken', refreshToken);
        if (list.length > 0) {
            return true;
        }
        return false;
    }
}