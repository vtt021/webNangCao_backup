const db = require('../utils/db');
const TABLE_NAME = 'course_content'

const contentData = [
    'id',
    'courseId',
    'isPreview',
    'content',
    'video'
];



module.exports = {
    async getAll() {
        const courseContents = await db(TABLE_NAME);
        return courseContents;
    },

    async getContentsByCourseId(courseId) {
        const courseContents = await db.select(contentData).from(TABLE_NAME).where({
            courseId: courseId,
            isDeleted: false
        });
        return courseContents;
    },

    async getCourseContentByContentId(id) {
        const courseContent = await db(TABLE_NAME).select(contentData).from(TABLE_NAME).where({
            id: id,
            isDeleted: false
        });
        courseContent.forEach(element => {
            delete element["isDeleted"];
            delete element["lastUpdated"];
        });
        return courseContent;
    },


    add(courseContent) {
        return db(TABLE_NAME).insert(courseContent);
    },

    update(id, courseContent) {
        courseContent.lastUpdated = new Date();
        return db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        }).update(courseContent);
    },

    delete(id) {
        return db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        }).update({
            isDeleted: true,
            lastUpdated: new Date()
        });
    },
}