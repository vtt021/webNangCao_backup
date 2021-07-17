const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isUnlocked: {
        type: Boolean, 
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

const CategorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        require: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

const SubCategorySchema = mongoose.Schema({
    categoryId: {
        type: String,
        require: true,
    },
    subCategoryName: {
        type: String,
        require: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

const CourseSchema = mongoose.Schema({
    courseName: {
        type: String,
        require: true,
    },
    subCategoryId: {
        type: String,
        require: true,
    },
    teacherId: {
        type: String,
        require: true,
    },
    imageThumbnail: {
        type: String
    },
    imageCourse: {
        type: String
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    salePrice: {
        type: Number,
        min: 0,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    },
    studentCount: {
        type: Number,
        default: 0
    },
    viewCount: {
        type: Number,
        default: 0
    },
    detailShort: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 100
    },
    detailLong: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 300
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

const CourseContentSchema = mongoose.Schema({
    courseId: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
        min: 1,
        max: 100
    },  
    video: {
        type: String,
        require: true,
        min: 1,
        max: 255
    },
    isPreview: {
        type: String,
        default: false
    }
})

const User =  mongoose.model('users', UserSchema);
const Category = mongoose.model('categories', CategorySchema);
const SubCategory = mongoose.model('sub_categories', SubCategorySchema);
const Course = mongoose.model('courses', CourseSchema);
const CourseContent = mongoose.model('course_contents', CourseContentSchema);

module.exports = {User, Category, SubCategory, Course, CourseContent}