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

    async getCourseById(id) {
        const course = await db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        });
        return course;
    },

    async search(queryString, page, ratingDesc, priceAsc) {
        let offset = 5 * (page - 1);
        console.log("queryString = " + queryString);
        const courses = await db.select(mainPageData).from(TABLE_NAME)
            .whereRaw('match(courseName) against(' + queryString + ' in boolean mode)')
            .limit(5)
            .offset(5 * (page - 1));


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

    // ! Chưa check được trường hợp gv add course không phải của mình
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