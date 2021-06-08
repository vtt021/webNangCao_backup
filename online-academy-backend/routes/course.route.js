const express = require('express');
const courseModel = require('../models/course.model');

const router = express.Router();


// router.get('/', async(req, res) => {
//     const list = await courseModel.getAll();
//     res.json(list);
// })

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

router.get('/search', async(req, res) => {
    const string = req.query.string;
    const ratingDesc = req.query.ratingDesc;
    const priceAsc = req.query.priceAsc;
    const page = req.query.page;
    const list = await courseModel.search(string, page, ratingDesc, priceAsc);
    return res.json(list);
})

router.post('/imageThumbnail', async(req, res) => {
    const link = req.body.link;

})

// router.post('/', async (req, res) => {
//     await courseModel.add(req.body);
//     return res.status(201).json(req.body);
// })

// router.put('/', async (req, res) => {
//     const id = req.body.id;
//     const category = req.body.category;
//     const ret = await courseModel.update(id, category);
//     return res.status(200).json(ret);
// })

// router.delete('/', async(req, res)=> {
//     const id = req.body.id;
//     const ret = await courseModel.delete(id);
//     return res.status(200).json(ret);
// })

module.exports = router;