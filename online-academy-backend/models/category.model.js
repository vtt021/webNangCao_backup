const db = require('../utils/db');
const TABLE_NAME = 'category'

module.exports = {
    async getAll() {
        const categories = await db(DB_NAME);
        return categories;
    },

    add(category) {
        return db(TABLE_NAME).insert(category);
    },

    update(id, category) {
        return db(DB_NAME).where({id: id}).update(category);
    },

    delete(id) {
        return db(DB_NAME).where({id: id}).del();
    },

}