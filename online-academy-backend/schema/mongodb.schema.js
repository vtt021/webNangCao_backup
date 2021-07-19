let mongoose = require('mongoose');
let UserSchema = mongoose.Schema({
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

let CategorySchema = mongoose.Schema({
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

let SubCategorySchema = mongoose.Schema({
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

let CourseSchema = mongoose.Schema({
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
    },
    hotPoint: {
        type: Number,
        default: 0
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

let CourseContentSchema = mongoose.Schema({
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
        default: null,
        min: 1,
        max: 255
    },
    isPreview: {
        type: String,
        default: false
    }
})

let RegisterCourseSchema = mongoose.Schema({
    courseId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    isFavorite: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    rateContent: {
        type: String,
        default: ""
    },
    progress: [
        {
            _id: false,
            contentId: {
                type: String,
                require: true
            },
            currentTime: {
                type: Number,
                default: 0
            }
        }
    ]
})



CourseSchema.index({
    courseName: "text"
})

let User =  mongoose.model('users', UserSchema);
let Category = mongoose.model('categories', CategorySchema);
let SubCategory = mongoose.model('sub_categories', SubCategorySchema);
let Course = mongoose.model('courses', CourseSchema);
let CourseContent = mongoose.model('course_contents', CourseContentSchema);
let RegisterCourse = mongoose.model('register_courses', RegisterCourseSchema);


module.exports = {User, Category, SubCategory, Course, CourseContent, RegisterCourse}