const express = require('express');
const categoryModel = require('../models/category.model');
const subCategoryModel = require('../models/subCategory.model');

const router = express.Router();
const adminAuthMdw = require('../middlewares/adminAuth.mdw')

router.get('/admin', adminAuthMdw, async (req, res, next) => {
    try {
        const list = await categoryModel.getAll();
        res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/', async (req, res, next) => {
    try {
        console.log("Here")
        const list = await categoryModel.getCategory();

        res.json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/id', async (req, res, next) => {
    try {
        let id = req.query.id;
        const list = await categoryModel.getCategoryName(id);
        
        res.status(200).json(list);
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).json({
            message: e.message
        })
    }
})

router.post('/', adminAuthMdw, async (req, res, next) => {
    try {
        let categoryId = await categoryModel.add(req.body);
        await subCategoryModel.add({
            categoryId: categoryId,
            subCategoryName: req.body.categoryName
        });
        return res.status(201).json({
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

router.put('/', adminAuthMdw, async (req, res, next) => {
    try {
        const id = req.body.id;
        const categoryName = req.body.categoryName;
        await categoryModel.update(id, categoryName);
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

router.delete('/', adminAuthMdw , async (req, res, next) => {
    try {
        const id = req.body.id;
        if (id === undefined) {
            return res.status(400).json({
                message: 'id not found'
            });
        }
        const subCategories = await subCategoryModel.getSubcategoryInCategory(id);
        if (subCategories.length !== 0) {
            return res.status(400).json({
                message: 'This category still has sub-category or invalid id'
            })
        }

        await categoryModel.delete(id);
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