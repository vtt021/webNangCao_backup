const db = require('../utils/db');
const TABLE_NAME = 'sub_category'

const {SubCategory, Category} = require('../schema/mongodb.schema');
const categoryModel = require('./category.model');
const contentData = '_id subCategoryName'

module.exports = {
    async getAll() {
        // const subCategories = await db(TABLE_NAME).where({ isDeleted: false });

        const subCategories = await SubCategory.find({}).exec();
        return subCategories;
    },

    async getSubcategoryInfo(id) {
        const subCategory = await SubCategory.findOne({_id: id, isDeleted: false}).exec();
        return subCategory;
    },

    async getSubcategoryName(id) {
        const subCategory = await SubCategory.findOne({_id: id, isDeleted: false}, ['_id', 'subCategoryName']).exec();
        return subCategory;
    },

    async getSubcategoryInCategory(categoryId) {
        // const subCategories = await db(TABLE_NAME).where({ isDeleted: false, categoryId: categoryId });

        console.log(categoryId)
        const subCategories = await SubCategory.find({ isDeleted: false, categoryId: categoryId }).exec();

        // subCategories.forEach(element => {
        //     delete element["isDeleted"];
        //     delete element["lastUpdated"];
        // });
        // console.log()
        return subCategories;
    },

    async getSubcategoryByCategoryName(categoryName) {
        const category = await Category.find({ isDeleted: false, categoryName: categoryName}).exec();

        let cate = category[0];

        if (cate == undefined) {
            return undefined;
        }

        const subCategories = await SubCategory.find({ isDeleted: false, categoryId: cate._id }).exec();
        return subCategories;
    },

    async add(subCategory) {
        // return db(TABLE_NAME).insert(subCategory);
        let newSub = new SubCategory;
        let cate = await Category.find({_id: subCategory.categoryId, isDeleted: false});

        if (cate.length != 1) {
            throw new Error("Invalid category id");
        }



        newSub.categoryId = subCategory.categoryId;
        newSub.subCategoryName = subCategory.subCategoryName;
        await newSub.save();
    },

    async update(id, subCategory) {
        subCategory.lastUpdated = new Date();

        // if (subCategory.categoryId != null) {
        //     let a = categoryModel.getCategoryName(subCategory.categoryId);
        //     console.log(a);
        //     if (a == null) {
        //         throw new Error("Invalid category id");
        //     }
        // }

        await SubCategory.find({_id: id}).updateMany(subCategory).exec(); 
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update(subCategory);
    },

    async delete(id) {
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update({
        //     isDeleted: true,
        //     lastUpdated: new Date()
        // });
        await SubCategory.where({_id: id}).updateMany({isDeleted: true}).exec();
    },
}