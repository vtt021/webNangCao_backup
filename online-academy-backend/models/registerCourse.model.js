const db = require('../utils/db');
const TABLE_NAME = 'register_course'

const { CourseContent, RegisterCourse } = require('../schema/mongodb.schema');
const courseContentModel = require('./courseContent.model');
const userModel = require('./user.model');

const contentData = [
    'courseId',
    'userId',
    'isFavorite',
    'rating',
    'rateContent'
];



module.exports = {
    async getAll() {
        // const registration = await db(TABLE_NAME);
        const registration = await RegisterCourse.find({}).exec();
        return registration;
    },


    async getRegisterCourseByUserId(userId) {
        const registration = await RegisterCourse.find({userId: userId}, contentData).exec();
        return registration;
    },

    async getRatingDetail(courseId) {
        // const ratings = await db.select([userId, rate, rateContent, lastUpdated]).from(TABLE_NAME).where({
        //     courseId: courseId
        // }).andWhere('rate', '>', 0).orderBy('lastUpdated', 'desc');

        const users = await userModel.getAllUsernameWithId();

        const ratings = await RegisterCourse.find({courseId: courseId}, [userId, rate, rateContent]).exec();

        for(let i = 0; i < ratings.length; i++) {
            let user = users.find(u => u['userId'].localeCompare(ratings[i]['userId']) == 0);
            ratings[i]['username'] = user['username'];
        }

        


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
        // const registration = await db(TABLE_NAME).select(contentData).from(TABLE_NAME).where({
        //     userId: userId,
        //     courseId: courseId,
        //     isDeleted: false
        // });

        const registration = await RegisterCourse.find({ courseId: courseId, userId: userId }).exec();

        return registration[0];
    },

    async changeFavoriteStatus(userId, courseId, isFavorite) {
        // return db(TABLE_NAME).where({
        //     courseId: courseId,
        //     userId: userId,
        // }).update({
        //     isFavorite: isFavorite,
        //     lastUpdated: new Date()
        // });

        await RegisterCourse.find({ courseId: courseId, userId: userId }).updateMany({ isFavorite: isFavorite }).exec();
    },

    async add(registration) {
        let newRegister = new RegisterCourse;
        let contents = await courseContentModel.getContentsByCourseId(registration.courseId);
        let contentIds = contents.map(c => ({ contentId: c['_id'] }));

        newRegister.progress = contentIds;
        newRegister.courseId = registration.courseId;
        newRegister.userId = registration.userId;

        await newRegister.save();
    },

    // async markUndeleted(courseId, userId) {
    //     return db(TABLE_NAME).where({
    //         courseId: courseId,
    //         userId: userId,
    //     }).update({
    //         isDeleted: true,
    //         lastUpdated: new Date()
    //     });
    // },


    async addRate(courseId, userId, rating, rateContent) {
        // return db(TABLE_NAME).where({
        //     courseId: courseId,
        //     userId: userId,
        //     isDeleted: false
        // }).update({
        //     rate: rating,
        //     rateContent: rateContent,
        //     lastUpdated: new Date()
        // })

        await CourseContent.find({ courseId: courseId, userId: userId }).updateMany({
            rating: rating,
            rateContent: rateContent
        })
    },

    async update(courseId, userId, courseContent) {
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