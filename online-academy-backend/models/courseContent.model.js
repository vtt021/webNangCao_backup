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
        const courseContents = await CourseContent.find({_id: contentId}, contentData).exec();
        return courseContents[0];
    },

    async getContentsByCourseId(courseId) {
        console.log(courseId);
        const courseContents = await CourseContent.find({courseId: courseId}).exec();
        console.log(courseContents)
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
        // content.video = courseContent.video;
        content.isPreview = courseContent.isPreview;

        // return db(TABLE_NAME).insert(courseContent);
        let a = await content.save();
        return a['_id']
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