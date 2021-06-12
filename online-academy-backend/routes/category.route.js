const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const list = await categoryModel.getAll();
        res.json(list);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/', async (req, res) => {
    try {
        await categoryModel.add(req.body);
        return res.status(201).json(req.body);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

router.put('/', async (req, res) => {
    try {
        const id = req.body.id;
        const category = req.body.category;
        const ret = await categoryModel.update(id, category);
        return res.status(200).json(ret);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

router.delete('/', async (req, res) => {
    try {


        const id = req.body.id;
        const ret = await categoryModel.delete(id);
        return res.status(200).json(ret);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router;