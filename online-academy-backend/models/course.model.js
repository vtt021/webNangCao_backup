const db = require('../utils/db');
const courseContentModel = require('./courseContent.model');
const subCategoryModel = require('./subCategory.model');
const TABLE_NAME = 'course'

const mainPageData = [
    'courseName',
    'subCategoryId',
    'teacherId',
    'rating',
    'ratingCount',
    'imageThumbnail',
    'price',
    'salePrice'
];

module.exports = {
    async getAll() {
        const courses = await db(TABLE_NAME).where({ isDeleted: false });

        courses.forEach(element => {
            delete element["isDeleted"];
            delete element["lastUpdated"];
        });
        return courses;
    },

    async getTopHotCourses(limit) {
        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({ isDeleted: false })
            .orderByRaw('(viewCount + studentCount * 5 + ratingCount * rating * 10) desc');

        if (limit !== undefined) {
            courses = courses.limit(limit);
        }

        return courses;
    },

    async getTopNewCourses(limit) {
        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({ isDeleted: false })
            .orderBy('createdDate', 'desc')
            .limit(limit);

        return courses;
    },

    async getTopWatchCourses(limit) {
        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({ isDeleted: false })
            .orderBy('viewCount', 'desc')
            .limit(limit)

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


        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({
                isDeleted: false,
            })
            .whereIn('subCategoryId', subCategoriesId)
            .limit(limit)
            .offset(offset);

        return courses;
    },

    async getCourseById(id) {
        const course = await db.select(mainPageData).from(TABLE_NAME).where({
            id: id,
            isDeleted: false
        });
        return course[0];
    },


    async getCoursesBySubCategory(subCategoryId, limit, page) {
        if ((page === undefined && limit !== undefined) || (page !== undefined && limit === undefined)) {
            throw new Error('page and limit must be both defined or undefined')
        }
        let offset = limit * (page - 1);

        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({
                isDeleted: false,
                subCategoryId: subCategoryId
            })
            .limit(limit)
            .offset(offset);

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

        const countCourse = await db(TABLE_NAME).count()
        .whereRaw('match(courseName) against(\'' + queryString + '\' in boolean mode) and isDeleted = false');

        const courses = await db.select(mainPageData).from(TABLE_NAME)
            .whereRaw('match(courseName) against(\'' + queryString + '\' in boolean mode) and isDelete = false')
            .orderBy([
                {
                    column: 'rating',
                    order: ratingDesc == true ? 'desc' : 'asc'
                },
                {
                    column: 'price',
                    order: priceAsc == true ? 'asc' : 'desc'
                }
            ])
            .limit(limit)
            .offset(offset)

        return {
            total: countCourse[0]['count(*)'],
            courses: courses
        };
    },

    add(course) {
        return db(TABLE_NAME).insert(course).returning('*');
    },

    async uploadThumbnailImage(id, filename) {
        let lastUpdated = new Date();
        return db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        }).update({
            imageThumbnail: filename,
            lastUpdated: lastUpdated
        })
    },

    update(id, course) {
        course.lastUpdated = new Date();
        return db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        }).update(course);
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