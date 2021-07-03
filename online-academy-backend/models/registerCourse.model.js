const db = require('../utils/db');
const TABLE_NAME = 'register_course'

const contentData = [
    'courseId',
    'userId',
    'isFavorite',
    'rating',
    'rateContent'
];



module.exports = {
    async getAll() {
        const registration = await db(TABLE_NAME);
        return registration;
    },


    async getRegisterCourseByUserId(userId) {
        const registration = await db.select(contentData).from(TABLE_NAME).where({
            userId: userId,
            isDeleted: false
        });
        return registration;
    },

    async getRatingDetail(courseId) {
        const ratings = await db.select([userId, rate, rateContent, lastUpdated]).from(TABLE_NAME).where({
            courseId: courseId
        }).andWhere('rate', '>', 0).orderBy('lastUpdated', 'desc');

        return ratings;
    },

    async getRegisterUsersByCourseId(courseId) {
        const registration = await db(TABLE_NAME).select(contentData).from(TABLE_NAME).where({
            courseId: courseId,
            isDeleted: false
        });
       
        return registration;
    },

    async getRegistration(userId, courseId) {
        const registration = await db(TABLE_NAME).select(contentData).from(TABLE_NAME).where({
            userId: userId,
            courseId: courseId,
            isDeleted: false
        });

        return registration[0];
    },

    async changeFavoriteStatus(userId, courseId, isFavorite) {
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
        }).update({
            isFavorite: isFavorite,
            lastUpdated: new Date()
        });
    },

    add(registration) {
        return db(TABLE_NAME).insert(registration);
    },

    markUndeleted(courseId, userId) {
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
        }).update({
            isDeleted: true,
            lastUpdated: new Date()
        });
    },




    addRate(courseId, userId, rating, rateContent) {
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            isDeleted: false
        }).update({
            rate: rating,
            rateContent: rateContent,
            lastUpdated: new Date()
        })
    },

    update(courseId, userId, courseContent) {
        courseContent.lastUpdated = new Date();
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            isDeleted: false
        }).update(courseContent);
    },

    delete(courseId, userId) {
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            isDeleted: false
        }).update({
            isDeleted: true,
            lastUpdated: new Date()
        });
    },
}