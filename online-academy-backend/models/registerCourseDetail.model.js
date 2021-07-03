const db = require('../utils/db');
const TABLE_NAME = 'register_course_detail'

const contentData = [
    'courseId',
    'userId',
    'contentId',
    'currentTime'
];



module.exports = {
    async getAll() {
        const details = await db(TABLE_NAME);
        return details;
    },

    async getDetailsByContent(courseId, userId, contentId) {
        const details = await db.select(contentData).from(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            contentId: contentId,
            isDeleted: false
        });
        return details[0];
    },

    async getDetailsByCourseAndUser(courseId, userId) {
        console.log(courseId, userId)
        const details = await db.select(contentData).from(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            isDeleted: false
        })
        return details;
    },

    

    add(details) {
        return db(TABLE_NAME).insert(details);
    },

    updateTime(courseId, userId, contentId, currentTime) {
        return db(TABLE_NAME).where({
            courseId: courseId,
            userId: userId,
            contentId: contentId
        }).update({
            currentTime: currentTime,
            lastUpdated: new Date()
        })
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