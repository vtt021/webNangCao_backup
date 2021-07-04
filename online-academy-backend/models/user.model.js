const db = require('../utils/db');

const TABLE_NAME = 'users';
const contentData = [
    'id',
    'email',
    'username'
]

module.exports = {
    async getAllUsers() {
        return db(TABLE_NAME);
    },

    async getUserById(id) {
        const users = await db.select(contentData).from(TABLE_NAME)
            .where({
                id: id,
                isDeleted: false,
                isUnlocked: true
            });

        return users[0];
    },

    async getUserByEmailForVerification(email) {
        const users = await db.from(TABLE_NAME)
            .where({
                email: email,
                isDeleted: false,
                isUnlocked: false
            });

        return users[0];
    },

    async getUserByEmailLogin(email) {
        const users = await db.from(TABLE_NAME)
            .where({
                email: email,
                isDeleted: false,
                isUnlocked: true
            });

        return users[0];
    },

    async getUserByEmail(email) {
        const users = await db.select(contentData).from(TABLE_NAME)
            .where(
                {
                    email: email,
                    isDeleted: false,
                    isUnlocked: true
                }
            );

        return users[0];
    },

    async addUser(user) {
        return db(TABLE_NAME).insert(user);
    },

    update(id, user) {
        delete user.password;
        return db(TABLE_NAME).where({ id: id }).update(user);
    },

    updatePassword(id, pass) {
        return db(TABLE_NAME).where({ id: id, isDeleted: false }).update({
            password: pass
        });
    },

    unlockAccount(email) {
        return db(TABLE_NAME).where({
            email: email,   
            isDeleted: false
        }).update({
            isUnlocked: true
        })
    },

    delete(id) {
        return db(TABLE_NAME).where({ id: id }).del();
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