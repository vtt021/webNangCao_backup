const TABLE_NAME = 'category'

const {Category} = require('../schema/mongodb.schema');
const contentData = '_id categoryName'

module.exports = {
    async getAll() {
        const categories = await Category.find({}).exec();
        return categories;
    },

    async getCategory() {
        const categories = await Category.find({isDeleted: false}, contentData).exec();
        return categories;
    },

    async getCategoryName(id) {
        const category = await Category.find({_id: id, isDeleted: false}, ['_id', 'categoryName']).exec();
        return category[0];
    },

   

    async add(category) {
        let newCategory = new Category;
        newCategory.categoryName = category.categoryName;
        await newCategory.save();
        return newCategory['_id']
    },

    async update(id, categoryName) {
        await Category.where({_id: id}).updateMany({categoryName: categoryName}).exec();
    },

    async delete(id) {
        await Category.where({_id: id}).updateMany({isDeleted: true}).exec();
    },
}