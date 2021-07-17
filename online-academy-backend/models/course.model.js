const db = require('../utils/db');
const courseContentModel = require('./courseContent.model');
const subCategoryModel = require('./subCategory.model');
const TABLE_NAME = 'course'

const { Course } = require('../schema/mongodb.schema');
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
    'salePrice'
];


module.exports = {
    async getAll() {
        // const courses = await db(TABLE_NAME).where({ isDeleted: false });
        const courses = await Course.find({}).exec();
        return courses;
    },

    async getTopHotCourses(limit) {
        // const courses = await db.select(mainPageData)
        //     .from(TABLE_NAME)
        //     .where({ isDeleted: false })
        //     .orderByRaw('(viewCount + studentCount * 5 + ratingCount * rating * 10) desc');

        // if (limit !== undefined) {
        //     courses = courses.limit(limit);
        // }
        const courses = await Course.find({ isDeleted: false }, mainPageData, {
            skip: 0,
            limit: parseInt(limit),
            sort: {
                hotPoint: -1
            }
        }).exec();

        return courses;
    },

    async getTopNewCourses(limit) {
        const courses = await Course.find({ isDeleted: false }, mainPageData, {
            skip: 0,
            limit: parseInt(limit),
            sort: {
                createdDate: -1
            }
        }).exec();
        return courses;
    },

    async getTopWatchCourses(limit) {
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
        return courses;
    },

    async getCoursesByCategory(categoryId, limit, page) {
        if ((page === undefined && limit !== undefined) || (page !== undefined && limit === undefined)) {
            throw new Error('page and limit must be both defined or undefined')
        }
        let offset = limit * (page - 1);

        const subCategories = await subCategoryModel.getSubcategoryInCategory(categoryId);

        console.log(subCategories);

        let subCategoriesId = subCategories.map(cate => {
            return cate.id;
        })
        console.log(subCategoriesId);


        // const courses = await db.select(mainPageData)
        //     .from(TABLE_NAME)
        //     .where({
        //         isDeleted: false,
        //     })
        //     .whereIn('subCategoryId', subCategoriesId)
        //     .limit(limit)
        //     .offset(offset);

        const courses = await Course.find({ isDeleted: false }, mainPageData, {
            skip: offset,
            limit: parseInt(limit),
            sort: {
                viewCount: -1
            }
        }).exec();

        return courses;
    },

    async getCourseById(id) {
        // const course = await db.select(mainPageData).from(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // });

        const course = await Course.find({_id: id, isDeleted: false }, mainPageData).exec();
        return course[0];
    },


    async getCoursesBySubCategory(subCategoryId, limit, page) {
        if ((page === undefined && limit !== undefined) || (page !== undefined && limit === undefined)) {
            throw new Error('page and limit must be both defined or undefined')
        }
        let offset = limit * (page - 1);

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


        return courses;
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
                $search: queryString
            }
         }, mainPageData, {
            skip: parseInt(offset),
            limit: parseInt(limit),
            sort: {
                rating: ratingDesc == true ? -1 : (ratingDesc == false ? 1 : undefined),
                price: priceAsc == true ? 1 : (priceAsc == false ? -1 : undefined)
            }
        }).exec();

        return {
            total: courses.length,
            courses: courses.slice(offset, offset + limit)
        };
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

        await newCourse.save();
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
        await Course.find({isDeleted: false, _id: id}).update({
            lastUpdated: new Date(),
            imageThumbnail: filename
        }).exec();
    },

    async uploadCourseImage(id, filename) {
        await Course.find({isDeleted: false, _id: id}).update({
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

        await Course.find({isDeleted: false, _id: id}).update(course).exec();
    },

    async delete(id) {
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update({
        //     isDeleted: true,
        //     lastUpdated: new Date()
        // });

        await Course.find({isDeleted: false, _id: id}).update({isDeleted: true}).exec()
    },
}