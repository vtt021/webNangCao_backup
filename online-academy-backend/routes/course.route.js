const express = require('express');
const courseModel = require('../models/course.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw')
const upload = require('../middlewares/upload.mdw')

const router = express.Router();


router.get('/', adminAuthMdw, async (req, res) => {
    try {
        const list = await courseModel.getAll();
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/ids', async (req, res) => {
    const list = await courseModel.getAllId();
    return res.json(list);
})

router.get('/new', async (req, res) => {
    try {
        const limit = req.query.limit;
        const list = await courseModel.getTopNewCourses(limit);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.get('/top-watch', async (req, res) => {
    try {
        const limit = req.query.limit;
        const list = await courseModel.getTopWatchCourses(limit);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.get('/hot', async (req, res) => {
    try {
        const limit = req.query.limit;
        const list = await courseModel.getTopHotCourses(limit);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.get('/search', async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const ratingDesc = req.query.ratingDesc;
        const priceAsc = req.query.priceAsc;
        const page = req.query.page;
        const limit = req.query.limit;

        if (keyword === undefined || keyword.length < 3) {
            return res.status(500).json({
                message: 'No keyword or keyword length < 3'
            })
        }


        if (page != undefined && page <= 0) {
            return res.status(400).json({
                message: 'Invalid page'
            })
        }
        if (limit != undefined && limit <= 0) {
            return res.status(400).json({
                message: 'Invalid limit'
            })
        }



        const list = await courseModel.search(keyword, page, limit, ratingDesc, priceAsc);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/category', async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        const page = req.query.page;
        const limit = req.query.limit;


        if (categoryId === undefined) {
            return res.status(500).json({
                message: 'invalid input'
            })
        }

        const list = await courseModel.getCoursesByCategory(categoryId, limit, page);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/cateName', async (req, res) => {
    try {
        const categoryName = req.query.categoryName;
        const page = req.query.page;
        const limit = req.query.limit;



        if (categoryName === undefined) {
            return res.status(500).json({
                message: 'invalid input'
            })
        }

        const list = await courseModel.getCoursesByCategoryName(categoryName, limit, page);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/sub-category', async (req, res) => {
    try {
        const subCategoryId = req.query.subCategoryId;
        const page = req.query.page;
        const limit = req.query.limit;


        if (subCategoryId === undefined) {
            return res.status(500).json({
                message: 'invalid input'
            })
        }

        const list = await courseModel.getCoursesBySubCategory(subCategoryId, limit, page);
        return res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/id', async (req, res) => {
    try {
        const courseId = req.query.id;
        const data = await courseModel.getCourseById(courseId);

        if (data === undefined) {
            return res.status(204).end();
        }

        return res.json(data);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/', teacherAuthMdw, async (req, res) => {
    try {
        let data = req.body;
        data.teacherId = req.accessTokenPayload.id;
        const course = await courseModel.add(data);
        return res.status(201).json({
            message: 'OK',
            courseId: course[0]
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/admin', adminAuthMdw, async (req, res) => {
    try {
        const course = await courseModel.add(req.body);
        return res.status(201).json({
            message: 'OK',
            courseId: course[0]
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/thumbnail-image', teacherAuthMdw, upload.uploadImageMdw, async (req, res) => {
    try {
        const file = req.file;
        const teacherId = req.accessTokenPayload.id;
        const courseId = req.body.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }

        if (file === undefined) {
            return res.status(400).json({
                message: 'Invalid file'
            })
        }

        const course = await courseModel.getCourseById(courseId);
        console.log(course);
        console.log(teacherId);

        if (course === undefined || course.teacherId !== teacherId) {
            res.status(400).json({
                message: 'Incorrect courseId or wrong teacher'
            })
        }

        await courseModel.uploadThumbnailImage(courseId, file.filename);
        res.status(200).json({
            message: 'OK',
            filename: file.filename
        })
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/thumbnail-image/admin', adminAuthMdw, upload.uploadImageMdw, async (req, res) => {
    try {
        const file = req.file;
        const courseId = req.body.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }
        if (file === undefined) {
            return res.status(400).json({
                message: 'Invalid file'
            })
        }

        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            res.status(400).json({
                message: 'Incorrect courseId'
            })
        }

        await courseModel.uploadThumbnailImage(courseId, file.filename);
        res.status(200).json({
            message: 'OK',
            filename: file.filename
        })
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/course-image', teacherAuthMdw, upload.uploadImageMdw, async (req, res) => {
    try {
        const file = req.file;
        const teacherId = req.accessTokenPayload.id;
        const courseId = req.body.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }

        if (file === undefined) {
            return res.status(400).json({
                message: 'Invalid file'
            })
        }

        const course = await courseModel.getCourseById(courseId);
        console.log(course);
        console.log(teacherId);

        if (course === undefined || course.teacherId !== teacherId) {
            res.status(400).json({
                message: 'Incorrect courseId or wrong teacher'
            })
        }

        await courseModel.uploadCourseImage(courseId, file.filename);
        res.status(200).json({
            message: 'OK',
            filename: file.filename
        })
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/course-image/admin', adminAuthMdw, upload.uploadImageMdw, async (req, res) => {
    try {
        const file = req.file;
        const courseId = req.body.courseId;

        if (courseId === undefined) {
            return res.status(400).json({
                message: 'Invalid courseId'
            })
        }
        if (file === undefined) {
            return res.status(400).json({
                message: 'Invalid file'
            })
        }

        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            res.status(400).json({
                message: 'Incorrect courseId'
            })
        }

        await courseModel.uploadCourseImage(courseId, file.filename);
        res.status(200).json({
            message: 'OK',
            filename: file.filename
        })
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.put('/', teacherAuthMdw, async (req, res) => {
    try {
        const teacherId = req.accessTokenPayload.id;
        const courseData = req.body.courseData;
        const courseId = req.body.courseId;

        console.log("courseId", courseId);
        console.log("courseData", courseData);
        console.log("teacherId", teacherId)

        const course = await courseModel.getCourseById(courseId);
        console.log(course);
        if (course === undefined || course.teacherId !== teacherId) {
            res.status(400).json({
                message: 'Incorrect courseId or wrong teacher'
            })
        }

        if (courseData !== undefined && courseData.teacherId !== undefined) {
            return res.status(400).json({
                message: 'Changed data must not have teacher id'
            });
        }


        await courseModel.update(courseId, courseData);
        return res.status(200).json({
            message: 'OK'
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.put('/admin', adminAuthMdw, async (req, res) => {
    try {
        const courseId = req.body.id;
        const courseData = req.body.courseData;

        const course = await courseModel.getCourseById(courseId);
        if (course === undefined) {
            res.status(400).json({
                message: 'Incorrect courseId'
            })
        }

        await courseModel.update(courseId, courseData);
        return res.status(200).json({
            message: 'OK'
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }

})

router.delete('/', teacherAuthMdw, async (req, res) => {
    try {
        const courseId = req.body.courseId;

        const course = await courseModel.getCourseById(courseId);
        console.log(course);
        if (course === undefined || course.teacherId !== teacherId) {
            res.status(400).json({
                message: 'Incorrect courseId or wrong teacher'
            })
        }

        await courseModel.delete(courseId);
        return res.status(200).json({
            message: 'OK'
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.delete('/admin', adminAuthMdw, async (req, res) => {
    try {
        const courseId = req.body.courseId;
        await courseModel.delete(courseId);
        return res.status(200).json({
            message: 'OK'
        });
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router;