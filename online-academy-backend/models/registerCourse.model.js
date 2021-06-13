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

    async getRegisterUsersByCourseId(courseId) {
        const registration = await db(TABLE_NAME).select(contentData).from(TABLE_NAME).where({
            courseId: courseId,
            isDeleted: false
        });
       
        return registration;
    },


    add(registration) {
        return db(TABLE_NAME).insert(registration);
    },


    addRate(rate) {
        let courseId = rate.courseId;
        let userId = rate.userId;
        let rating = rate.rating || 0;
        let rateContent = rate.rateContent || "";

        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            isDeleted: false
        }).update({
            rate: rating,
            rateContent: rateContent
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