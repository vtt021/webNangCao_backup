const express = require('express');
const courseContentModel = require('../models/courseContent.model');
const teacherAuthMdw = require('../middlewares/teacherAuth.mdw');
const userAuthMdw = require('../middlewares/userAuth.mdw');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');

const router = express.Router();



router.get('/', adminAuthMdw, async (req, res) => {
    try {
        const list = await courseContentModel.getAll();
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
        let id = req.params.id || 0;
        const list = await courseContentModel.getContentsByCourseId(id);
        return res.json(list);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

// router.post('/imageThumbnail', async(req, res) => {
//     const link = req.body.link;

// })

router.post('/', teacherAuthMdw, async (req, res) => {
    try {
        await courseContentModel.add(req.body);
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
        const courseContentUpdateData = req.body.courseContent;
        const ret = await courseContentModel.update(id, courseContentUpdateData);
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
        const ret = await courseContentModel.delete(id);
        return res.status(200).json(ret);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router;