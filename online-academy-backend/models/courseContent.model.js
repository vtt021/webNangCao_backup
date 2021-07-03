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

    async getContentsByContentId(contentId) {
        const courseContents = await db.select(contentData).from(TABLE_NAME).where({
            id: contentId,
            isDeleted: false
        });

        if (courseContents.length === 0) {
            return null;
        }

        if (courseContents[0].isPreview === 0) {
            delete courseContents[0].video;
        }
        return courseContents[0];
    },

    async getContentsByCourseId(courseId) {
        const courseContents = await db.select(contentData).from(TABLE_NAME).where({
            courseId: courseId,
            isDeleted: false
        });

        courseContents.forEach(content => {
            if (content.isPreview === 0) {
                delete content.video;
            }
        })
        
        return courseContents;
    },


    add(courseContent) {
        return db(TABLE_NAME).insert(courseContent);
    },

    uploadVideoContent(id, video) {
        return db(TABLE_NAME).where({
            id: id
        }).update({
            lastUpdated: new Date(),
            video: video
        })
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