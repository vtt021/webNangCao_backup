const db = require('../utils/db');
const courseContentModel = require('./courseContent.model');
const subCategoryModel = require('./subCategory.model');
const userModel = require('./user.model');
const TABLE_NAME = 'course'

const { Course } = require('../schema/mongodb.schema');
const { getAllUsernameWithId } = require('./user.model');
const contentData = 'courseName subCategoryId teacherId rating ratingCount imageThumbnail price salePrice'


const mainPageData = [
    'courseName',
    'subCategoryId',
    'teacherId',
    'rating',
    'ratingCount',
    'imageThumbnail',
    'imageCourse',
    'price',
    'salePrice',
    '_id'
];


module.exports = {
    async getAll() {
        // const courses = await db(TABLE_NAME).where({ isDeleted: false });
        const courses = await Course.find({}).exec();
        return courses;
    },

    async getAllId() {
        const courses = await Course.find({}, ['_id']).exec();
        return courses;
    },

    async getTeacherCourses(teacherId) {
        const courses = await Course.find({'teacherId': teacherId}).exec();
        return courses;
    },

    async getArrayCourses(courseIds) {
        const courses = await Course.find({'_id': {
            $in: courseIds
        }}, ['_id', 'courseName']).exec();
        return courses;
    },

    async getArrayDetailedCourses(courseIds) {
        const courses = await Course.find({'_id': {
            $in: courseIds
        }}).exec();

        let users = await userModel.getAllUsernameWithId();

        let newCourses = [];

        for (let i = 0; i < courses.length; i++) {
            let user = users.find(u => {
                let a = u['_id'];
                let b = courses[i]['teacherId'];
                return a == b
            });

            let data = {};

            data['_id'] = courses[i]['_id'];
            data["teacherName"] = user.username;
            data['courseName'] = courses[i]['courseName']
            data['subCategoryId'] = courses[i]['subCategoryId']
            data['teacherId'] = courses[i]['teacherId']
            data['rating'] = courses[i]['rating']
            data['ratingCount'] = courses[i]['ratingCount']
            data['imageThumbnail'] = courses[i]['imageThumbnail']
            data['imageCourse'] = courses[i]['imageCourse']
            data['price'] = courses[i]['price']
            data['salePrice'] = courses[i]['salePrice']
            newCourses.push(data)
        }
        return newCourses;
    },

    async getTopHotCourses(limit) {
        // const courses = await db.select(mainPageData)
        //     .from(TABLE_NAME)
        //     .where({ isDeleted: false })
        //     .orderByRaw('(viewCount + studentCount * 5 + ratingCount * rating * 10) desc');

        // if (limit !== undefined) {
        //     courses = courses.limit(limit);
        // }
        let users = await userModel.getAllUsernameWithId();


        let courses = await Course.find({ isDeleted: false }, mainPageData, {
            skip: 0,
            limit: parseInt(limit),
            sort: {
                hotPoint: -1
            }
        }).exec();

        let newCourses = [];
        for (let i = 0; i < courses.length; i++) {
            let user = users.find(u => {
                let a = u['_id'];
                let b = courses[i]['teacherId'];
                return a == b
            });

            let data = {};

            data['_id'] = courses[i]['_id'];
            data["teacherName"] = user.username;
            data['courseName'] = courses[i]['courseName']
            data['subCategoryId'] = courses[i]['subCategoryId']
            data['teacherId'] = courses[i]['teacherId']
            data['rating'] = courses[i]['rating']
            data['ratingCount'] = courses[i]['ratingCount']
            data['imageThumbnail'] = courses[i]['imageThumbnail']
            data['imageCourse'] = courses[i]['imageCourse']
            data['price'] = courses[i]['price']
            data['salePrice'] = courses[i]['salePrice']
            newCourses.push(data)
        }
        return newCourses;
    },

    async getTopNewCourses(limit) {
        let users = await userModel.getAllUsernameWithId();

        const courses = await Course.find({ isDeleted: false }, mainPageData, {
            skip: 0,
            limit: parseInt(limit),
            sort: {
                createdDate: -1
            }
        }).exec();

        let newCourses = [];
        for (let i = 0; i < courses.length; i++) {
            let user = users.find(u => {
                let a = u['_id'];
                let b = courses[i]['teacherId'];
                return a == b
            });

            let data = {};

            data['_id'] = courses[i]['_id'];
            data["teacherName"] = user.username;
            data['courseName'] = courses[i]['courseName']
            data['subCategoryId'] = courses[i]['subCategoryId']
            data['teacherId'] = courses[i]['teacherId']
            data['rating'] = courses[i]['rating']
            data['ratingCount'] = courses[i]['ratingCount']
            data['imageThumbnail'] = courses[i]['imageThumbnail']
            data['imageCourse'] = courses[i]['imageCourse']
            data['price'] = courses[i]['price']
            data['salePrice'] = courses[i]['salePrice']
            newCourses.push(data)
        }
        return newCourses;
    },

    async getTopWatchCourses(limit) {
        let users = await userModel.getAllUsernameWithId();

        // const courses = await db.select(mainPageData)
        //     .from(TABLE_NAME)
        //     .where({ isDeleted: false })
        //     .orderBy('viewCount', 'desc')
        //     .limit(limit)
        const courses = await Course.find({ isDeleted: false }, mainPageData, {
            skip: 0,
            limit: parseInt(limit),
            sort: {
                viewCount: -1
            }
        }).exec();

        let newCourses = [];
        for (let i = 0; i < courses.length; i++) {
            let user = users.find(u => {
                let a = u['_id'];
                let b = courses[i]['teacherId'];
                return a == b
            });

            let data = {};

            data['_id'] = courses[i]['_id'];
            data["teacherName"] = user.username;
            data['courseName'] = courses[i]['courseName']
            data['subCategoryId'] = courses[i]['subCategoryId']
            data['teacherId'] = courses[i]['teacherId']
            data['rating'] = courses[i]['rating']
            data['ratingCount'] = courses[i]['ratingCount']
            data['imageThumbnail'] = courses[i]['imageThumbnail']
            data['imageCourse'] = courses[i]['imageCourse']
            data['price'] = courses[i]['price']
            data['salePrice'] = courses[i]['salePrice']
            newCourses.push(data)
        }
        return newCourses;
    },

    async getCoursesByCategory(categoryId, limit, page) {
        if ((page === undefined && limit !== undefined) || (page !== undefined && limit === undefined)) {
            throw new Error('page and limit must be both defined or undefined')
        }
        let offset = limit * (page - 1);
        const subCategories = await subCategoryModel.getSubcategoryInCategory(categoryId);
        const teachers = await userModel.getAllTeachers();

        let subCategoriesId = subCategories.map(cate => {
            return cate.id;
        })

        console.log(subCategoriesId)

        let subMap = {}
        let teacherMap = {}

        for (let i = 0; i < subCategories.length; i++) {
            subMap[subCategories[i]['_id']] = subCategories[i].subCategoryName;
        }

        for (let i = 0; i < teachers.length; i++) {
            teacherMap[teachers[i]['_id']] = teachers[i].username;
        }

        console.log(subMap);
        console.log(teacherMap)

        const courses = await Course.find({
            isDeleted: false,
            subCategoryId: {
                $in: subCategoriesId
            }
        }, mainPageData, {
            skip: offset,
            limit: parseInt(limit),
            sort: {
                viewCount: -1
            }
        }).exec();

        let newCourses = [];
        for (let i = 0; i < courses.length; i++) {


            let data = {};

            data['_id'] = courses[i]['_id'];
            data["teacherName"] = teacherMap[courses[i].teacherId];
            // data["teacherName"] = user.username;
            data['courseName'] = courses[i]['courseName']
            data['subCategoryId'] = courses[i]['subCategoryId']
            data['teacherId'] = courses[i]['teacherId']
            data['rating'] = courses[i]['rating']
            data['ratingCount'] = courses[i]['ratingCount']
            data['imageThumbnail'] = courses[i]['imageThumbnail']
            data['imageCourse'] = courses[i]['imageCourse']
            data['price'] = courses[i]['price']
            data['salePrice'] = courses[i]['salePrice']
            data['detailShort'] = courses[i]['detailShort']
            data['detailLong'] = courses[i]['detailLong']
            data['isCompleted'] = courses[i]['isCompleted']
            data['totalRating'] = courses[i]['totalRating']
            data['studentCount'] = courses[i]['studentCount']
            newCourses.push(data)
        }
        return newCourses;
    },

    async getCoursesByCategoryName(categoryName, limit, page) {
        if ((page === undefined && limit !== undefined) || (page !== undefined && limit === undefined)) {
            throw new Error('page and limit must be both defined or undefined')
        }
        let offset = limit * (page - 1);
        const subCategories = await subCategoryModel.getSubcategoryByCategoryName(categoryName);
        if (subCategories == undefined) {
            return res.status(400).json({
                message: 'Invalid category name'
            })
        }
        const teachers = await userModel.getAllTeachers();

        let subCategoriesId = subCategories.map(cate => {
            return cate.id;
        })

        console.log(subCategoriesId)

        let subMap = {}
        let teacherMap = {}

        for (let i = 0; i < subCategories.length; i++) {
            subMap[subCategories[i]['_id']] = subCategories[i].subCategoryName;
        }

        for (let i = 0; i < teachers.length; i++) {
            teacherMap[teachers[i]['_id']] = teachers[i].username;
        }

        console.log(subMap);
        console.log(teacherMap)

        const courses = await Course.find({
            isDeleted: false,
            subCategoryId: {
                $in: subCategoriesId
            }
        }, mainPageData, {
            skip: offset,
            limit: parseInt(limit),
            sort: {
                viewCount: -1
            }
        }).exec();

        let newCourses = [];
        for (let i = 0; i < courses.length; i++) {


            let data = {};

            data["teacherName"] = teacherMap[courses[i].teacherId];
            data['courseName'] = courses[i]['courseName']
            data['subCategoryId'] = courses[i]['subCategoryId']
            data['teacherId'] = courses[i]['teacherId']
            data['rating'] = courses[i]['rating']
            data['ratingCount'] = courses[i]['ratingCount']
            data['imageThumbnail'] = courses[i]['imageThumbnail']
            data['imageCourse'] = courses[i]['imageCourse']
            data['price'] = courses[i]['price']
            data['salePrice'] = courses[i]['salePrice']
            newCourses.push(data)
        }
        return newCourses;
    },

    async getCourseById(id) {
        // const course = await db.select(mainPageData).from(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // });
        let users = await userModel.getAllUsernameWithId();

        const courses = await Course.find({ _id: id, isDeleted: false }).exec();

        if (courses[0] !== undefined) {
            let newCourses = [];
            for (let i = 0; i < courses.length; i++) {
                let user = users.find(u => {
                    let a = u['_id'];
                    let b = courses[i]['teacherId'];
                    return a == b
                });

                let data = {};

                data['_id'] = courses[i]['_id'];
                data["teacherName"] = user.username;
                data['courseName'] = courses[i]['courseName']
                data['subCategoryId'] = courses[i]['subCategoryId']
                data['teacherId'] = courses[i]['teacherId']
                data['rating'] = courses[i]['rating']
                data['ratingCount'] = courses[i]['ratingCount']
                data['imageThumbnail'] = courses[i]['imageThumbnail']
                data['imageCourse'] = courses[i]['imageCourse']
                data['price'] = courses[i]['price']
                data['salePrice'] = courses[i]['salePrice']
                data['detailShort'] = courses[i]['detailShort']
                data['detailLong'] = courses[i]['detailLong']
                data['isCompleted'] = courses[i]['isCompleted']
                data['totalRating'] = courses[i]['totalRating']
                data['studentCount'] = courses[i]['studentCount']

                await Course.find({ _id: id, isDeleted: false }).updateMany({
                    viewCount: courses[i]['viewCount'] + 1,
                    hotPoint: courses[i]['hotPoint'] + 1
                })


                newCourses.push(data)
            }





            return newCourses[0];
        }
        return courses[0];
    },



    async getCoursesBySubCategory(subCategoryId, limit, page) {
        if ((page === undefined && limit !== undefined) || (page !== undefined && limit === undefined)) {
            throw new Error('page and limit must be both defined or undefined')
        }
        let offset = limit * (page - 1);
        let users = await userModel.getAllUsernameWithId();

        // const courses = await db.select(mainPageData)
        //     .from(TABLE_NAME)
        //     .where({
        //         isDeleted: false,
        //         subCategoryId: subCategoryId
        //     })
        //     .limit(limit)
        //     .offset(offset);

        const courses = await Course.find({ subCategoryId: subCategoryId, isDeleted: false }, mainPageData, {
            skip: offset,
            limit: parseInt(limit),
            sort: {
                viewCount: -1
            }
        }).exec();

        console.log(courses)


        let newCourses = [];
        for (let i = 0; i < courses.length; i++) {
            let user = users.find(u => {
                let a = u['_id'];
                let b = courses[i]['teacherId'];
                return a == b
            });

            let data = {};

            data['_id'] = courses[i]['_id'];
            data["teacherName"] = user.username;
            data['courseName'] = courses[i]['courseName']
            data['subCategoryId'] = courses[i]['subCategoryId']
            data['teacherId'] = courses[i]['teacherId']
            data['rating'] = courses[i]['rating']
            data['ratingCount'] = courses[i]['ratingCount']
            data['imageThumbnail'] = courses[i]['imageThumbnail']
            data['imageCourse'] = courses[i]['imageCourse']
            data['price'] = courses[i]['price']
            data['salePrice'] = courses[i]['salePrice']
            newCourses.push(data)
        }
        return newCourses;
    },

    // async getCourseDetail(id) {
    //     const course = await db.select(mainPageData)
    //         .from(TABLE_NAME)
    //         .where({
    //             isDeleted: false
    //         });

    //     if (course !== null) {
    //         const detail = await courseContentModel.getContentsByCourseId(id);
    //         course.detail = detail;
    //     }

    //     return course;
    // },

    async search(queryString, page, limit, ratingDesc, priceAsc) {
        if ((page === undefined && limit !== undefined) || (page !== undefined && limit === undefined)) {
            throw new Error('page and limit must be both defined or undefined')
        }

        let offset = limit * (page - 1);
        console.log("queryString = " + queryString);

        let users = await userModel.getAllUsernameWithId();


        // const countCourse = await db(TABLE_NAME).count()
        //     .whereRaw('match(courseName) against(\'' + queryString + '\' in boolean mode) and isDeleted = false');

        // const courses = await db.select(mainPageData).from(TABLE_NAME)
        //     .whereRaw('match(courseName) against(\'' + queryString + '\' in boolean mode) and isDelete = false')
        //     .orderBy([
        //         {
        //             column: 'rating',
        //             order: ratingDesc == true ? 'desc' : 'asc'
        //         },
        //         {
        //             column: 'price',
        //             order: priceAsc == true ? 'asc' : 'desc'
        //         }
        //     ])
        //     .limit(limit)
        //     .offset(offset)

        const courses = await Course.find({
            $text: {
                $search: "/" + queryString + "/",
                $language: 'en'
            }
        }, mainPageData, {
            skip: parseInt(offset),
            limit: parseInt(limit),
            sort: {
                rating: ratingDesc == true ? -1 : (ratingDesc == false ? 1 : undefined),
                price: priceAsc == true ? 1 : (priceAsc == false ? -1 : undefined)
            }
        }).exec();

        console.log(courses);

        let newCourses = [];
        for (let i = 0; i < courses.length; i++) {
            let user = users.find(u => {
                let a = u['_id'];
                let b = courses[i]['teacherId'];
                return a == b
            });

            let data = {};
            data['_id'] = courses[i]['_id'];
            data["teacherName"] = user.username;
            data['courseName'] = courses[i]['courseName']
            data['subCategoryId'] = courses[i]['subCategoryId']
            data['teacherId'] = courses[i]['teacherId']
            data['rating'] = courses[i]['rating']
            data['ratingCount'] = courses[i]['ratingCount']
            data['imageThumbnail'] = courses[i]['imageThumbnail']
            data['imageCourse'] = courses[i]['imageCourse']
            data['price'] = courses[i]['price']
            data['salePrice'] = courses[i]['salePrice']
            newCourses.push(data)
        }
        // return newCourses;

        if (limit != undefined) {
            return {
                total: newCourses.length,
                courses: newCourses.slice(offset, offset + limit)
            };
        }
        else {
            return {
                total: newCourses.length,
                courses: newCourses
            }
        }

        
    },

    async add(course) {
        // return db(TABLE_NAME).insert(course).returning('*');
        let newCourse = new Course;
        newCourse.courseName = course.courseName
        newCourse.subCategoryId = course.subCategoryId
        newCourse.teacherId = course.teacherId
        newCourse.price = course.price
        newCourse.detailShort = course.detailShort
        newCourse.detailLong = course.detailLong

        let a = await newCourse.save();
        return a['_id']

        
    },

    async uploadThumbnailImage(id, filename) {
        // let lastUpdated = new Date();


        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update({
        //     imageThumbnail: filename,
        //     lastUpdated: lastUpdated
        // })
        await Course.find({ isDeleted: false, _id: id }).updateMany({
            lastUpdated: new Date(),
            imageThumbnail: filename
        }).exec();
    },

    async uploadCourseImage(id, filename) {
        await Course.find({ isDeleted: false, _id: id }).updateMany({
            lastUpdated: new Date(),
            imageCourse: filename
        }).exec();
    },

    async update(id, course) {
        course.lastUpdated = new Date();
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update(course);

        await Course.find({ isDeleted: false, _id: id }).updateMany(course).exec();
    },

    async delete(id) {
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update({
        //     isDeleted: true,
        //     lastUpdated: new Date()
        // });

        await Course.find({ isDeleted: false, _id: id }).updateMany({ isDeleted: true }).exec()
    },
}