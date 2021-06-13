const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'quangthinh123321',
        database: 'onlineacademy',
        port: 800
    },
    pool: { min: 0, max: 50 }
});

module.exports = knex;