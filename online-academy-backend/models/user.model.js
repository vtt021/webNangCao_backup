const authConstant = require('../utils/auth.constant');
const db = require('../utils/db');
const { UserSchema } = require('../schema/mongodb.schema')
const mongoose = require('mongoose');

const User = mongoose.model('users', UserSchema);

const TABLE_NAME = 'users';
const contentData = '_id email username'

module.exports = {
    async getAllUsers() {
        const data = await User.find({}).exec();
        return data;
    },

    async getUserById(id) {
        // const users = await db.select(contentData).from(TABLE_NAME)
        //     .where({
        //         id: id,
        //         isDeleted: false,
        //         isUnlocked: true
        //     });

        // return users[0];

        const user = await User.findById(id, '_id email username isDeleted isUnlocked').exec();

        if (user.isDeleted === false && user.isUnlocked === true) {
            return user;
        }
        return undefined;
    },

    async getAllTeachers() {
        // const teachers = await db.select(['id', 'username']).from(TABLE_NAME)
        // .where({
        //     role: authConstant.KEY_TEACHER_AUTH
        // });

        const teachers = await User.find({
            role: 1,
            isDeleted: false,
            isUnlocked: false,
        }, contentData).exec();

        return teachers;
    },

    async getUserByEmailForVerification(email) {
        // const users = await db.from(TABLE_NAME)
        //     .where({
        //         email: email,
        //         isDeleted: false,
        //         isUnlocked: false
        //     });

        // return users[0];

        const users = await User.find({
            email: email,
            isDeleted: false,
            isUnlocked: false
        }).exec();

        return users;
    },

    async getUserByEmailLogin(email) {
        // const users = await db.from(TABLE_NAME)
        //     .where({
        //         email: email,
        //         isDeleted: false,
        //         isUnlocked: true
        //     });

        // return users[0];

        const users = await User.find({
            email: email,
            isDeleted: false,
            isUnlocked: true
        }).exec();

        return users;
    },

    async getUserByEmail(email) {
        // const users = await db.select(contentData).from(TABLE_NAME)
        //     .where({
        //         email: email,
        //         isDeleted: false,
        //         isUnlocked: true
        //     });
        // return users[0];
        const users = await User.find({
            email: email,
            isDeleted: false,
            isUnlocked: true
        }).exec();

        return users[0];
    },

    async addUser(user) {
        // return db(TABLE_NAME).insert(user);
        const newUser = new User;
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.email = user.email;
        await newUser.save();
    },

    async update(id, user) {
        delete user.password;
        delete user.id;

        await User.updateOne({
            id: id
        }, user);

        // return db(TABLE_NAME).where({ id: id }).update(user);
    },

    updatePassword(id, pass) {
        // return db(TABLE_NAME).where({ id: id, isDeleted: false }).update({
        //     password: pass
        // });

        await User.updateOne({
            id: id
        }, { password: password });
    },

    unlockAccount(email) {
        // return db(TABLE_NAME).where({
        //     email: email,
        //     isDeleted: false
        // }).update({
        //     isUnlocked: true
        // })

        await User.updateOne({
            email: email,
            isDeleted: false
        }, {
            isUnlocked: true
        },{
            omitUndefined: true
        })
    },

    delete(id) {
        // return db(TABLE_NAME).where({ id: id }).del();
        await User.findByIdAndUpdate(id, {
            isDeleted: true
        })
    },

    patchRFToken(id, refreshToken) {
        // return db(TABLE_NAME).where('id', id).update('refreshToken', refreshToken);
        await User.findByIdAndUpdate(id, {
            refreshToken: refreshToken
        })
    },

    async isValidRefreshToken(id, refreshToken) {
        const user = await User.findById(id);

        if (user.refreshToken.localeCompare(refreshToken) == 0) {
            return true;
        }
        return false;
    }
}