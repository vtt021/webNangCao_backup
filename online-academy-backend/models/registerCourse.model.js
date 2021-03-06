const TABLE_NAME = 'register_course'

const { CourseContent, RegisterCourse } = require('../schema/mongodb.schema');
const courseContentModel = require('./courseContent.model');
const userModel = require('./user.model');
const courseModel = require('./course.model');

const contentData = [
    'courseId',
    'userId',
    'isFavorite',
    'rating',
    'rateContent',
    '_id',
    'progress'
];



module.exports = {
    async getAll() {
        const registration = await RegisterCourse.find({}).exec();
        return registration;
    },

    async getAllIds() {
        const registration = await RegisterCourse.find({}, ['userId', 'courseId']).exec();
        return registration;
    },

    async getIdOnly() {
        const registration = await RegisterCourse.find({}, '_id').exec();
        return registration;
    },


    async getRegisterCourseByUserId(userId) {
        const registration = await RegisterCourse.find({ userId: userId }, contentData).exec();
        return registration;
    },

    async getRegisterCourseDataByUserId(userId) {
        const registration = await RegisterCourse.find({ userId: userId }, ['courseId']).exec();

        let courses = registration.map(r => r.courseId);
        console.log(courses);

        let data = courseModel.getArrayDetailedCourses(courses);

        return data;
    },

    async getRatingDetail(courseId) {
        let users = await userModel.getAllUsernameWithId();
        console.log(users);

        let ratings = await RegisterCourse.find({ 
            courseId: courseId,
            rating: {
                $ne: 0
            }
        }, 'userId rating rateContent').exec();

        let newRatings = [];

        for (let i = 0; i < ratings.length; i++) {
            let user = users.find(u => {
                let a = u['_id'];
                let b = ratings[i]['userId'];
                return a == b
            });

            let data = {};
            data["rating"] = ratings[i]["rating"]
            data["rateContent"] = ratings[i]["rateContent"]
            // data["_id"] = ratings[i]["_id"]
            // data["userId"] = ratings[i]["userId"]
            data["username"] = user.username;
            newRatings.push(data)
        }
        return newRatings;
    },

    async getRegisterUsersByCourseId(courseId) {


        let users = await userModel.getAllUsernameWithId();
        console.log(users);
        console.log(courseId)
        console.log("Here");
        let ratings = await RegisterCourse.find({ courseId: courseId }).exec();
        console.log("ratings" , ratings)

        let newRegistration = [];

        let userMap = users.map(u => {
            return ({
                id: (u['_id'].toString()),
                username: u['username']
            });
        })
        
        // console.log(userMap)


        for (let i = 0; i < ratings.length; i++) {
            let str = ratings[i]["userId"];
           
            // console.log("user", user)
            let name = "";

            for(let j = 0; j < userMap.length; j++) {
                // console.log(str.localeCompare(userMap[j]['id']))
                if (str.localeCompare(userMap[j]['id']) == 0) {
                    name = userMap[j]['username']
                    break;
                }
            }

            let data = {};
            data["rating"] = ratings[i]["rating"]
            data["rateContent"] = ratings[i]["rateContent"]
            data["userId"] = ratings[i]["userId"]
            data["username"] = name


            

            newRegistration.push(data)
        }
        return newRegistration;
    },

    async changeId(oldId, newId) {
        await RegisterCourse.find({userId: oldId}).updateMany({
            userId: newId
        })
    },

    async getRegistration(userId, courseId) {
        console.log(userId);
        console.log(courseId);


        const registration = await RegisterCourse.find({ courseId: courseId, userId: userId }).exec();
        console.log(registration)
        console.log(registration[0])
        return registration[0];
    },

    async getRegistrationById(id) {


        const registration = await RegisterCourse.find({ _id: id}).exec();
        return registration[0];
    },

    async changeFavoriteStatus(userId, courseId, isFavorite) {


        await RegisterCourse.find({ courseId: courseId, userId: userId }).updateMany({ isFavorite: isFavorite }).exec();
    },

    async add(registration) {
        let newRegister = new RegisterCourse;
        // let contents = await courseContentModel.getContentsByCourseId(registration.courseId);
        // console.log(contents);
        // let contentIds = contents.map(c => ({ contentId: c['_id'] }));

        // newRegister.progress = contentIds;
        newRegister.courseId = registration.courseId;
        newRegister.userId = registration.userId;

        // console.log(contentIds);

        await newRegister.save();
    },



    async updateProgress(courseId, userId, contentId, time) {
        const registration = await RegisterCourse.find({ courseId: courseId, userId: userId }).exec();
        let progress = registration[0]['progress'];
        let isFound = progress.findIndex(p => p.contentId.localeCompare(contentId) == 0);
        console.log(isFound)
        if (isFound != -1) {
            console.log(progress)
            console.log(progress[isFound]);
            progress[isFound]['currentTime'] = time;
        }
        else {
            let newData = {
                contentId: contentId,
                currentTime: time
            }
            progress.push(newData)
        }


        await RegisterCourse.find({ courseId: courseId, userId: userId }).updateMany({
            progress: progress
        });
    },


    async addRate(courseId, userId, rating, rateContent) {


        await RegisterCourse.find({ courseId: courseId, userId: userId }).updateMany({
            rating: rating,
            rateContent: rateContent
        })
    },

    async addFakeRate(id, rating, rateContent) {
        await RegisterCourse.find({ _id: id}).updateMany({
            rating: rating,
            rateContent: rateContent
        })
    },

    async update(courseId, userId, courseContent) {
        await RegisterCourse.find({ courseId: courseId, userId: userId }).updateMany(courseContent);
    },

    async deleteAllCourseRegistration(courseId) {
        await RegisterCourse.find({courseId: courseId}).deleteMany();
    },

    async delete(courseId, userId) {


        await RegisterCourse.find({ courseId: courseId, userId: userId }).deleteMany();

    },
}