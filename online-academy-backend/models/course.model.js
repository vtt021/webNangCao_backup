const db = require('../utils/db');
const courseContentModel = require('./courseContent.model');
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
            .orderBy('createdDate', 'desc');

        if (limit !== undefined) {
            courses = courses.limit(limit);
        }
        return courses;
    },

    async getTopWatchCourses(limit) {
        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({ isDeleted: false })
            .orderBy('viewCount', 'desc')

        if (limit !== undefined) {
            courses = courses.limit(limit);
        }

        return courses;
    },

    async getCoursesByCategory(categoryId, limit, page) {
        let offset = limit * (page - 1);

        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({
                isDeleted: false,
                categoryId: categoryId
            })
            .limit(limit)
            .offset(offset);

        return courses;
    },

    async getCourseById(id) {
        const course = await db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        });
        return course;
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
        let offset = limit * (page - 1);
        console.log("queryString = " + queryString);
        const courses = await db.select(mainPageData).from(TABLE_NAME)
            .whereRaw('match(courseName) against(' + queryString + ' in boolean mode)')
            .limit(limit)
            .offset(offset);


        if (ratingDesc === true) {
            courses = courses.orderBy('rating', 'desc');
        }

        if (priceAsc === true) {
            courses = courses.orderBy('price', 'asc');
        }
        return courses;
    },

    add(course) {
        return db(TABLE_NAME).insert(course);
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