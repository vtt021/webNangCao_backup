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

        let a = await content.save();
        return a['_id']
    },

    async uploadVideoContent(id, video) {
     

        await CourseContent.find({_id: id}).updateMany({video: video}).exec();
    },

    async update(id, courseContent) {


        await CourseContent.find({_id: id}).updateMany(courseContent).exec();
    },

    async delete(id) {


        await CourseContent.find({_id: id}).deleteMany();
    },
}