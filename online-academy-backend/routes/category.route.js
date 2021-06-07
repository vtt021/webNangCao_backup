const express = require('express');
const categoryModel = require('../models/category.model');

const router = express.Router();


router.get('/', async(req, res) => {
    const list = await categoryModel.getAll();
    res.json(list);
})

router.post('/', async (req, res) => {
    await categoryModel.add(req.body);
    return res.status(201).json(req.body);
})

router.put('/', async (req, res) => {
    const id = req.body.id;
    const category = req.body.category;
    const ret = await categoryModel.update(id, category);
    return res.status(200).json(ret);
})

router.delete('/', async(req, res)=> {
    const id = req.body.id;
    const ret = await categoryModel.delete(id);
    return res.status(200).json(ret);
})

module.exports = router;