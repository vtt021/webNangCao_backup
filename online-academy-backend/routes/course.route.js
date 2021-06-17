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
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/new', async (req, res) => {
    try {
        const limit = req.query.limit;
        const list = await courseModel.getTopNewCourses(limit);
        return res.json(list);
    }
    catch (e) {
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
        res.status(500).json({
            message: e.message
        })
    }

})

router.get('/search', async (req, res) => {
    try {
        const string = req.query.keyword;
        const ratingDesc = req.query.ratingDesc;
        const priceAsc = req.query.priceAsc;
        const page = req.query.page;
        const limit = req.query.limit;
        const list = await courseModel.search(string, page, limit, ratingDesc, priceAsc);
        return res.json(list);
    }
    catch (e) {
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
        const list = await courseModel.getCoursesByCategory(categoryId, limit, page);
        return res.json(list);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const data = await courseModel.get(courseId);
        return res.json(data);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

//TODO: Thêm route cho thêm ảnh đại diện khóa học

router.post('/', teacherAuthMdw, async (req, res) => {
    try {
        await courseModel.add(req.body);
        return res.status(201).json(req.body);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/thumbnail-image', teacherAuthMdw, upload.uploadImageMdw,  async(req, res) => {
    const file = req.file;
    const teacherId = req.accessTokenPayload.id;
    const courseId = req.body.id;
    const course = await courseModel.getCourseById(courseId);

    if (course === null || course.teacherId !== teacherId) {
        res.status(400).json({
            message: 'Incorrect courseId or wrong teacher'
        })
    }

    await courseModel.uploadThumbnailImage(courseId, file.filename);

    console.log(file);
    res.status(200).json({
        message: 'OK',
        filename: file.filename
    })
})

router.put('/', teacherAuthMdw, async (req, res) => {
    try {
        const id = req.body.id;
        const courseData = req.body.courseData;
        const ret = await courseModel.update(id, courseData);
        return res.status(200).json(ret);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }

})

router.delete('/', teacherAuthMdw, async (req, res) => {
    try {
        const id = req.body.id;
        const ret = await courseModel.delete(id);
        return res.status(200).json(ret);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router;