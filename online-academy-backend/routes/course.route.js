const express = require('express');
const courseModel = require('../models/course.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');

const router = express.Router();


router.get('/', userAuthMdw, async (req, res) => {
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
        const list = await courseModel.getTopNewCourses();
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
        const list = await courseModel.getTopWatchCourses();
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
        const list = await courseModel.getTopHotCourses();
        return res.json(list);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }

})

router.get('/search', userAuth, async (req, res) => {
    try {
        const string = req.query.string;
        const ratingDesc = req.query.ratingDesc;
        const priceAsc = req.query.priceAsc;
        const page = req.query.page;
        const list = await courseModel.search(string, page, ratingDesc, priceAsc);
        return res.json(list);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }

})

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