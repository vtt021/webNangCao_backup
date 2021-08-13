const authConstant = require('../utils/auth.constant');
const db = require('../utils/db');
const { User } = require('../schema/mongodb.schema')
const mongoose = require('mongoose');



const TABLE_NAME = 'users';
const contentData = '_id email username'

module.exports = {
    async getAllUsers() {
        const data = await User.find({}).exec();
        return data;
    },

    async getAllInfoById(id) {
        const user = await User.find({_id: id}).exec();
        return user[0];
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

        console.log(user);
        console.log("isDeleted", user['isDeleted']);
        console.log("isUnlocked", user['isUnlocked']);

        if (user.isDeleted == false && user.isUnlocked == true) {
            return user;
        }
        else {

            return undefined;
        }
    },

    async getFavoriteCourses(id) {
        const favorites = await User.find({_id: id, isDeleted: false}, ['favorite']).exec();  
        let fav = favorites[0].favorite;
        return fav;
    },

    async updateFavorite(userId, favorites) {
        await User.find({_id: userId}).updateMany({favorite: favorites}).exec();
    },

    async getAllTeachers() {
        // const teachers = await db.select(['id', 'username']).from(TABLE_NAME)
        // .where({
        //     role: authConstant.KEY_TEACHER_AUTH
        // });

        const teachers = await User.find({
            role: 1,
            isDeleted: false,
            isUnlocked: true,
        }, contentData).exec();

        return teachers;
    },

    async getAllUsernameWithId() {
        const users = await User.find({}).exec();

        return users;
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

        return users[0];
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

        return users[0];
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
        newUser.favorite = [];
        await newUser.save();
    },

    async addTeacher(user) {
        const newUser = new User;
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.email = user.email;
        newUser.favorite = [];
        newUser.role = 1;
        newUser.isUnlocked = true;
        await newUser.save();
    },

    async update(id, user) {
        delete user.password;
        delete user.id;

        await User.where({_id: id}).updateMany(user);

        // return db(TABLE_NAME).where({ id: id }).update(user);
    },

    async updatePassword(id, pass) {
        // return db(TABLE_NAME).where({ id: id, isDeleted: false }).update({
        //     password: pass
        // });

        await User.updateMany({
            _id: id
        }, { password: pass });
    },

    async unlockAccount(email) {
        // return db(TABLE_NAME).where({
        //     email: email,
        //     isDeleted: false
        // }).update({
        //     isUnlocked: true
        // })

        await User.where({
            email: email,
            isDeleted: false
        }).updateMany({
            isUnlocked: true
        }).exec();
    },

    async delete(id) {
        // return db(TABLE_NAME).where({ id: id }).del();
        await User.where({_id: id}).updateMany({
            isDeleted: true
        }).exec();
    },

    async patchRFToken(id, refreshToken) {
        // return db(TABLE_NAME).where('id', id).update('refreshToken', refreshToken);
        await User.where({_id: id}).updateOne({
            refreshToken: refreshToken
        }).exec();
    },

    async isValidRefreshToken(id, refreshToken) {
        const user = await User.findById(id);

        if (user.refreshToken.localeCompare(refreshToken) == 0) {
            return true;
        }
        return false;
    }
}