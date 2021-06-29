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
        const list = await categoryModel.getAll();
        list.forEach(element => {
            delete element["isDeleted"];
            delete element["lastUpdated"];
        });
        res.json(list);
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
        await categoryModel.add(req.body);
        return res.status(201).json(req.body);
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
        const category = req.body;
        await categoryModel.update(id, category);
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

router.delete('/',adminAuthMdw , async (req, res, next) => {
    try {
        const id = req.body.id;
        const subCategories = await subCategoryModel.getSubcategoryInCategory(id);

        if (subCategories.length === 0) {
            return res.status(400).json({
                message: 'This category still has sub-category'
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