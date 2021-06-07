const express = require('express');
const subCategoryModel = require('../models/subCategory.model');

const router = express.Router();


router.get('/', async(req, res) => {
    const categoryId = req.body.id;
    
    if (categoryId === undefined) {
        const list = await subCategoryModel.getAll();  
        res.json(list);
    }
    else {
        const list = await subCategoryModel.getSubcategoryInCategory(categoryId);
        res.json(list);
    }

})

router.post('/', async (req, res) => {
    await subCategoryModel.add(req.body);
    return res.status(201).json(req.body);
})

router.put('/', async (req, res) => {
    const id = req.body.id;
    const subCategory = req.body.subCategory;
    const ret = await subCategoryModel.update(id, subCategory);
    return res.status(200).json(ret);
})

router.delete('/', async(req, res)=> {
    const id = req.body.id;
    await subCategoryModel.delete(id);
    return res.status(200).json(ret);
})

module.exports = router;