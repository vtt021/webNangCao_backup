const db = require('../utils/db');
const TABLE_NAME = 'course_content'

const {CourseContent} = require('../schema/mongodb.schema')

const contentData = [
    '_id',
    'courseId',
    'isPreview',
    'content',
    'video'
];



module.exports = {
    async getAll() {
        // const courseContents = await db(TABLE_NAME);
        const courseContents = await CourseContent.find({}).exec();
        return courseContents;
    },

    async getContentsByContentId(contentId) {
        // const courseContents = await db.select(contentData).from(TABLE_NAME).where({
        //     id: contentId,
        //     isDeleted: false
        // });

        const courseContents = await CourseContent.find({_id: contentId}, contentData).exec();
        return courseContents[0];
    },

    async getContentsByCourseId(courseId) {
        // const courseContents = await db.select(contentData).from(TABLE_NAME).where({
        //     courseId: courseId,
        //     isDeleted: false
        // });

        const courseContents = await CourseContent.find({courseId: courseId}).exec();

        // courseContents.forEach(content => {
        //     if (content.isPreview === 0) {
        //         delete content.video;
        //     }
        // })
        
        return courseContents;
    },


    async add(courseContent) {
        let content = new CourseContent;
        content.courseId = courseContent.courseId;
        content.content = courseContent.content;
        content.video = courseContent.video;

        // return db(TABLE_NAME).insert(courseContent);
        await content.save();
    },

    async uploadVideoContent(id, video) {
        // return db(TABLE_NAME).where({
        //     id: id
        // }).update({
        //     lastUpdated: new Date(),
        //     video: video
        // })

        await CourseContent.find({_id: id}).updateMany({video: video}).exec();
    },

    async update(id, courseContent) {
        // courseContent.lastUpdated = new Date();
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update(courseContent);

        await CourseContent.find({_id: id}).updateMany(courseContent).exec();
    },

    async delete(id) {
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update({
        //     isDeleted: true,
        //     lastUpdated: new Date()
        // });

        await CourseContent.find({_id: id}).deleteMany();
    },
}