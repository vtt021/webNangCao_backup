require('dotenv').config();
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_URL || '127.0.0.1',
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '1900561252',
        database: process.env.DB_NAME || 'onlineacademy',
        port: process.env.DB_PORT || 3306
    },
    pool: { min: 0, max: 50 }
});
module.exports = knex;