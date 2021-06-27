const db = require('../utils/db');
const TABLE_NAME = 'category'

module.exports = {
    async getAll() {
        const categories = await db(TABLE_NAME).where({ isDeleted: false });
        return categories;
    },

    async getCategoryName(id) {
        const category = await db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        });
        return category;
    },

    add(category) {
        return db(TABLE_NAME).insert(category);
    },

    update(id, category) {
        category.lastUpdated = new Date();
        delete category.id;
        return db(TABLE_NAME).where({
            id: id,
            isDeleted: false
        }).update(category);
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