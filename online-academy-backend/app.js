const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// const auth = require('./middlewares/auth.mdw');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

global.__basedir = __dirname;


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`API is running at http://localhost:${PORT}`);
})

app.use('/api/file', require('./routes/upload.route'));
// app.use('/api/auth', require('./routes/auth.route'));

// app.use('/api/actors', require('./routes/actor.route'))
// app.use('/api/categories', require('./routes/category.route'));
// app.use('/api/countries', require('./routes/country.route'));
// app.use('/api/cities', auth, require('./routes/city.route'));
// app.use('/api/users', require('./routes/user.route'));

app.get('/err', (req, res) => {
    throw new Error('Error!')
})

app.use((req, res, next) => {
    res.status(404).json({
        error_message: 'Endpoint not found'
    });
})

app.use((req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Internal server error'
    })
})

app.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    });
})