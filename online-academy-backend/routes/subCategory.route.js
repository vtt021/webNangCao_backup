const express = require('express');
const adminAuthMdw = require('../middlewares/adminAuth.mdw');
const courseModel = require('../models/course.model');
const subCategoryModel = require('../models/subCategory.model');
const categoryModel = require('../models/category.model');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const id = req.query.id;

        if (id === undefined) {
            const list = await subCategoryModel.getAll();
            list.forEach(element => {
                delete element["isDeleted"];
                delete element["lastUpdated"];
            });
            res.json(list);
        }
        else {
            const list = await subCategoryModel.getSubcategoryInCategory(id);
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

router.get('/all', async (req, res) => {
    try {

        const list = await subCategoryModel.getAll();

        let ret = {};

        for (let i = 0; i < list.length; i++) {
            ret[list[i]['_id']] = list[i]['categoryId']
        }


        // if (id === undefined) {
        //     const list = await subCategoryModel.getAll();
        //     list.forEach(element => {
        //         delete element["isDeleted"];
        //         delete element["lastUpdated"];
        //     });
        //     res.json(list);
        // }
        // else {
        //     const list = await subCategoryModel.getSubcategoryInCategory(id);
        //     list.forEach(element => {
        //         delete element["isDeleted"];
        //         delete element["lastUpdated"];
        //     });
        //     res.json(list);
        // }
        return res.status(200).json(ret);
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
        const list = await subCategoryModel.getSubcategoryName(id);
        console.log(list)
        return res.status(200).json(list)
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

        let cateList = await categoryModel.getAll();
        let cateObj = {};

        cateList.forEach(c => {
            cateObj[c['_id']] = c['categoryName'];
        })

        if (categoryId === undefined) {
            let list = await subCategoryModel.getAll();


            let arr = list.map(a => {
                return {
                    "isDeleted": a["isDeleted"],
                    "_id": a["_id"],
                    "categoryId": a["categoryId"],
                    "subCategoryName": a["subCategoryName"],
                    "lastUpdated": a["lastUpdated"],
                    "categoryName": cateObj[a["categoryId"]]
                }
            })

            res.status(200).send(arr);
        }
        else {
            const list = await subCategoryModel.getSubcategoryInCategory(categoryId);
            let arr = list.map(a => {
                return {
                    "isDeleted": a["isDeleted"],
                    "_id": a["_id"],
                    "categoryId": a["categoryId"],
                    "subCategoryName": a["subCategoryName"],
                    "lastUpdated": a["lastUpdated"],
                    "categoryName": cateObj[a["categoryId"]]
                }
            })

            res.status(200).send(arr);
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