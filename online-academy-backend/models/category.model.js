const db = require('../utils/db');
const TABLE_NAME = 'category'

const {Category} = require('../schema/mongodb.schema');
const contentData = '_id categoryName'

module.exports = {
    async getAll() {
        // const categories = await db(TABLE_NAME).where({ isDeleted: false });
        const categories = await Category.find({}).exec();
        return categories;
    },

    async getCategoryName(id) {
        // const category = await db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // });

        const category = await Category.findOne(id).exec();
        return category;
    },

    async add(category) {
        let newCategory = new Category;
        newCategory.categoryName = category.categoryName;
        await newCategory.save();

        // return db(TABLE_NAME).insert(category);
    },

    async update(id, category) {
        category.lastUpdated = new Date();
        delete category.id;
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update(category);

        await Category.where({_id: id}).update({category}).exec();
    },

    async delete(id) {
        // return db(TABLE_NAME).where({
        //     id: id,
        //     isDeleted: false
        // }).update({
        //     isDeleted: true,
        //     lastUpdated: new Date()
        // });
        await Category.where({_id: id}).update({isDeleted: true}).exec();
    },
}