require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

// const auth = require('./middlewares/auth.mdw');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

global.__basedir = __dirname;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connect success!')
    }
})


let APP_PORT = process.env.PORT || 3003;
app.listen(APP_PORT, () => {
    console.log(`API is running at http://localhost:${APP_PORT}`);
})

app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Hello'
    });
})

app.use('/api/files', require('./routes/upload.route'));
app.use('/api/categories', require('./routes/category.route'));
app.use('/api/sub-categories', require('./routes/subCategory.route'))
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/courses', require('./routes/course.route'))
app.use('/api/users', require('./routes/user.route'))
app.use('/api/course-contents', require('./routes/courseContent.route'))
app.use('/api/register-courses', require('./routes/registerCourse.route'))
// app.use('/api/register-details', require('./routes/registerCourseDetail.route'));

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


