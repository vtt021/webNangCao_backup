const db = require('../utils/db');
const TABLE_NAME = 'register_course_detail'

const contentData = [
    'courseId',
    'userId',
    'contentId',
    'completeRate',
    'rateContent'
];



module.exports = {
    async getAll() {
        const details = await db(TABLE_NAME);
        return details;
    },

    async getDetailsByCourseId(courseId, userId, contentId) {
        const details = await db.select(contentData).from(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            contentId: contentId,
            isDeleted: false
        });
        return details;
    },

    

    add(details) {
        return db(TABLE_NAME).insert(details);
    },

    async updatePercent(courseId, userId, contentId, completeRate) {
        courseContent.lastUpdated = new Date(); 
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            contentId: contentId,
            isDeleted: false
        }).update({
            completeRate: completeRate,
            lastUpdated: new Date()
        })
    },

    removeContent(courseId, userId) {
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId
        }).delete();
    },


    delete(courseId, userId, contentId) {
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            contentId: contentId,
            isDeleted: false
        }).update({
            isDeleted: true,
            lastUpdated: new Date()
        });
    },
}