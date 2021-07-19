const express = require('express');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');
const courseModel = require('../models/course.model');
const subCategoryModel = require('../models/subCategory.model');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const categoryId = req.body.id;

        if (categoryId === undefined) {
            const list = await subCategoryModel.getAll();
            list.forEach(element => {
                delete element["isDeleted"];
                delete element["lastUpdated"];
            });
            res.json(list);
        }
        else {
            const list = await subCategoryModel.getSubcategoryInCategory(categoryId);
            list.forEach(element => {
                delete element["isDeleted"];
                delete element["lastUpdated"];
            });
            res.json(list);
        }
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/admin', adminAuthMdw, async (req, res) => {
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
        console.log(e.stack);
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
        console.log(e.stack);
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
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.delete('/', async (req, res) => {
    try {
        const id = req.body.id;
        const courseInSubcategory = await courseModel.getCoursesBySubCategory(id);

        if (courseInSubcategory.length === 0) {
            await subCategoryModel.delete(id);
        }
        else {
            return res.status(400).json({
                message: 'There are courses in this sub-category'
            });
        }
        
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