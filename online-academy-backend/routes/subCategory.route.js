const express = require('express');
const subCategoryModel = require('../models/subCategory.model');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const categoryId = req.body.id;

        if (categoryId === undefined) {
            const list = await subCategoryModel.getAll();
            res.json(list);
        }
        else {
            const list = await subCategoryModel.getSubcategoryInCategory(categoryId);
            res.json(list);
        }
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }


})

router.post('/', async (req, res) => {
    try {
        await subCategoryModel.add(req.body);
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
        const subCategory = req.body.subCategory;
        const ret = await subCategoryModel.update(id, subCategory);
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
        await subCategoryModel.delete(id);
        return res.status(200).json(ret);
    }
    catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router;