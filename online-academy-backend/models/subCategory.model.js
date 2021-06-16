const db = require('../utils/db');
const TABLE_NAME = 'sub_category'

module.exports = {
    async getAll() {
        const subCategories = await db(TABLE_NAME).where({ isDeleted: false });
        return subCategories;
    },

    async getSubcategoryName(id) {
        const subCategory = await db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        });
        return subCategory;
    },

    async getSubcategoryInCategory(categoryId) {
        const subCategories = await db(TABLE_NAME).where({ isDeleted: false, categoryId: categoryId });

        subCategories.forEach(element => {
            delete element["isDeleted"];
            delete element["lastUpdated"];
        });
        return subCategories;
    },

    add(subCategory) {
        return db(TABLE_NAME).insert(subCategory);
    },

    update(id, subCategory) {
        subCategory.lastUpdated = new Date();
        return db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        }).update(subCategory);
    },

    delete(id) {
        return db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        }).update({
            isDeleted: true,
            lastUpdated: new Date()
        });
    },
}