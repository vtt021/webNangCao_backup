const express = require('express');
const courseModel = require('../models/course.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');

const router = express.Router();


router.get('/', userAuthMdw,  async(req, res) => {
    const list = await courseModel.getAll();
    return res.json(list);
})

router.get('/new', async(req, res) => {
    const list = await courseModel.getTopNewCourses();
    return res.json(list);
})

router.get('/top-watch', async(req, res) => {
    const list = await courseModel.getTopWatchCourses();
    return res.json(list);
})

router.get('/hot', async(req, res) => {
    const list = await courseModel.getTopHotCourses();
    return res.json(list);
})

router.get('/search', userAuth, async(req, res) => {
    const string = req.query.string;
    const ratingDesc = req.query.ratingDesc;
    const priceAsc = req.query.priceAsc;
    const page = req.query.page;
    const list = await courseModel.search(string, page, ratingDesc, priceAsc);
    return res.json(list);
})

router.post('/', teacherAuthMdw,  async (req, res) => {
    await courseModel.add(req.body);
    return res.status(201).json(req.body);
})

router.put('/', teacherAuthMdw, async (req, res) => {
    const id = req.body.id;
    const courseData = req.body.courseData;
    const ret = await courseModel.update(id, courseData);
    return res.status(200).json(ret);
})

router.delete('/', teacherAuthMdw, async(req, res)=> {
    const id = req.body.id;
    const ret = await courseModel.delete(id);
    return res.status(200).json(ret);
})

module.exports = router;