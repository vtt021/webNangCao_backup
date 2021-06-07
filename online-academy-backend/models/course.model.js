const db = require('../utils/db');
const TABLE_NAME = 'course'
const auth = require('../middlewares/auth.mdw');
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

    async getTopHotCourses() {
        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({ isDeleted: false })
            .orderByRaw('(viewCount + studentCount * 5 + ratingCount * (rating - 3) * 10) desc')
            .limit(4);

        // const courses = [];

        // queryData.forEach(element => {
        //     let course = {};
        //     course.courseName = element.courseName;
        //     course.subCategoryId = element.subCategoryId;
        //     course.teacherId = element.teacherId;
        //     course.rating = element.rating;
        //     course.ratingCount = element.ratingCount;
        //     course.imageThumbnail = element.imageThumbnail;
        //     course.price = element.price;
        // });

        return courses;
    },

    async getTopNewCourses() {
        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({ isDeleted: false })
            .orderBy('lastUpdate', 'desc')
            .limit(10);


        return courses;
    },

    async getTopWatchCourses() {
        const courses = await db.select(mainPageData)
            .from(TABLE_NAME)
            .where({ isDeleted: false })
            .orderBy('viewCount', 'desc')
            .limit(10);

        return courses;
    },


    async getCourseName(id) {
        const course = await db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        });
        return course;
    },

    add(course) {
        return db(TABLE_NAME).insert(course);
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