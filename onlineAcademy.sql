drop database if exists onlineAcademy;
create database onlineAcademy;
use onlineAcademy;
ALTER DATABASE onlineacademy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

create table users(
	id int not null primary key auto_increment,
    email varchar(255) unique not null,
    username varchar(255) not null,
    password varchar(255) not null,
    refreshToken varchar(255),
	role int not null default 0,
    isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp
);
-- tài khoản admin: username: abc@xyz.com, password: qwerty 
-- tài khoản teacher: username: abcd@xyz.com, password: qwerty
insert into users (email, username, password, role) values ("abc@xyz.com","qwerty", "$2b$10$wVqUEHpSmq9hJDDf8pLlbu1nO9YHXptHnB3jtZBUKK9ZGWnYPCuve", 2);
insert into users (email, username, password, role) values ("abcd@xyz.com","qwerty", "$2b$10$wVqUEHpSmq9hJDDf8pLlbu1nO9YHXptHnB3jtZBUKK9ZGWnYPCuve", 1);
insert into users (email, username, password, role) values ("abc2@xyz.com","abc2", "abc", 1);
insert into users (email, username, password, role) values ("abc3@xyz.com","abc3", "abc", 1);
insert into users (email, username, password, role) values ("abc4@xyz.com","abc4", "abc", 1);
insert into users (email, username, password, role) values ("abc5@xyz.com","abc5", "abc", 0);
insert into users (email, username, password, role) values ("abc6@xyz.com","abc6", "abc", 0);
insert into users (email, username, password, role) values ("abc7@xyz.com","abc7", "abc", 0);
insert into users (email, username, password, role) values ("abc8@xyz.com","abc8", "abc", 0);
insert into users (email, username, password, role) values ("abc9@xyz.com","abc9", "abc", 0);
insert into users (email, username, password, role) values ("abc10@xyz.com","abc10", "abc", 0);
insert into users (email, username, password, role) values ("abc11@xyz.com","abc11", "abc", 0); 



create table category (
	id int not null primary key auto_increment,
    categoryName varchar(255) not null,
    isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp
);

insert into category (categoryName) values("Lập trình");
insert into category (categoryName) values("Toán");
insert into category (categoryName) values("Lý");
insert into category (categoryName) values("Hóa");

create table sub_category (
	categoryId int not null,
	id int not null auto_increment,
    subCategoryName char(255) character set utf8mb4 not null unique,
    isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp,
    primary key (id),
    constraint FK_SubCategory_Category foreign key (categoryId) references category(id)
);

insert into sub_category (categoryId, subCategoryName) values(1, "Lập trình 1");
insert into sub_category (categoryId, subCategoryName) values(1, "Lập trình 2");
insert into sub_category (categoryId, subCategoryName) values(2, "Toán 1");
insert into sub_category (categoryId, subCategoryName) values(3, "Lý 1");
insert into sub_category (categoryId, subCategoryName) values(4, "Hóa 1");


create table course (
	id int auto_increment primary key not null,
    courseName char(80) character set utf8mb4 not null	,
    subCategoryId int not null,
	teacherId int not null, 
    imageThumbnail varchar(255),
    imageCourse varchar(255),
    price int not null default 0,
    salePrice int,
    rating double not null default 0,
    ratingCount int not null default 0,
    studentCount int not null default 0,
    viewCount int not null default 0,
    detailShort char(255) character set utf8mb4,
    detailLong text(1023) character set utf8mb4,
    isCompleted boolean default false,
    isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp,
    createdDate timestamp default current_timestamp,
    fulltext(courseName),
    
    constraint FK_Course_UserId foreign key (teacherId) references users(id),
    constraint FK_Course_Category foreign key (subCategoryId) references sub_category(id)
);

insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Abc def", 1, 1, 0, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Abc ghi", 2, 2, 15000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Abcd wad", 3, 1, 0, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("dp e Abc", 4, 2, 30000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("a w fhe", 5, 1, 50000, "abcd", "abcd");

create table course_content (
	id int not null auto_increment,
	courseId int not null,
    isPreview boolean not null default false,
    content char(255) character set utf8mb4,
    video char(255) character set utf8mb4,
	isDeleted boolean not null default false,
    lastUpdated timestamp not null default current_timestamp,
    constraint FK_CourseContent_Course foreign key (courseId) references course(id),
    primary key (id)
);
insert into course_content(courseId, content, isPreview) values(1, "Chương 1", true);
insert into course_content(courseId, content, isPreview) values(1, "Chương 2", true);
insert into course_content(courseId, content, isPreview) values(1, "Chương 3", true);
insert into course_content(courseId, content, isPreview) values(1, "Chương 4", true);
insert into course_content(courseId, content, isPreview) values(1, "Chương 5", true);
insert into course_content(courseId, content, isPreview) values(2, "Chương 1", true);
insert into course_content(courseId, content, isPreview) values(2, "Chương 2", true);
insert into course_content(courseId, content, isPreview) values(2, "Chương 3", true);
insert into course_content(courseId, content, isPreview) values(2, "Chương 4", true);
insert into course_content(courseId, content, isPreview) values(2, "Chương 5", true);
insert into course_content(courseId, content, isPreview) values(3, "Chương 1", true);
insert into course_content(courseId, content, isPreview) values(3, "Chương 2", true);
insert into course_content(courseId, content, isPreview) values(3, "Chương 3", true);
insert into course_content(courseId, content, isPreview) values(3, "Chương 4", true);
insert into course_content(courseId, content, isPreview) values(3, "Chương 5", true);
insert into course_content(courseId, content, isPreview) values(4, "Chương 1", true);
insert into course_content(courseId, content, isPreview) values(4, "Chương 2", true);
insert into course_content(courseId, content, isPreview) values(4, "Chương 3", true);
insert into course_content(courseId, content, isPreview) values(4, "Chương 4", true);
insert into course_content(courseId, content, isPreview) values(4, "Chương 5", true);
insert into course_content(courseId, content, isPreview) values(5, "Chương 1", true);
insert into course_content(courseId, content, isPreview) values(5, "Chương 2", true);
insert into course_content(courseId, content, isPreview) values(5, "Chương 3", true);
insert into course_content(courseId, content, isPreview) values(5, "Chương 4", true);
insert into course_content(courseId, content, isPreview) values(5, "Chương 5", true);

create table register_course(
	courseId int not null,
    userId int not null,
    isFavorite boolean not null default false,
	rating int not null default 0,
    rateContent char(255) character set utf8mb4,
    isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp,
    primary key (courseId, userId),
    constraint FK_RegisterCourse_Course foreign key (courseId) references course(id),
    constraint FK_RegisterCourse_Users foreign key (userId) references users(id)
);

insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (1, 1, true, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (1, 2, true, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (3, 3, false, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (2, 1, false, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (4, 6, false, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (5, 2, false, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (5, 1, false, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (4, 8, false, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (1, 9, false, 1, "nice");
insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (3, 10, false, 1, "nice");

-- create table rating_detail(
-- 	id int not null auto_increment,
-- 	courseId int not null,
--     userId int not null,
--     rating int not null,
--     content varchar(255),
--     isDeleted boolean not null default false,
--     lastUpdated timestamp default current_timestamp,
--     primary key (id),
--     constraint Rating_Check check (rating between 0 and 5),
--     constraint FK_RatingDetail_RegisterCourse foreign key (courseId, userId) references register_course(courseId, userId)
--     -- constraint FK_RatingDetail_RegisterCourse_Users foreign key (userId) references users(id)
-- );


create table register_course_detail(
	courseId int not null,
    userId int not null,
    contentId int not null,
    completeRate int not null default 0 check (completeRate <= 100 and completeRate >= 0),
    
	isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp,
    primary key (courseId, userId, contentId),
    constraint FK_CourseIdUserId_RegisterCourse foreign key (courseId, userId) references register_course(courseId, userId),
    constraint FK_ContentId_CourseContent foreign key (contentId) references course_content(id)
);

insert into register_course_detail(courseId, userId, contentId, completeRate) values(1, 1, 1,20);
insert into register_course_detail(courseId, userId, contentId, completeRate) values(1, 1, 2,50);
insert into register_course_detail(courseId, userId, contentId, completeRate) values(1, 1, 3,30);
insert into register_course_detail(courseId, userId, contentId, completeRate) values(1, 1, 4,20);
insert into register_course_detail(courseId, userId, contentId, completeRate) values(1, 1, 5,10);

-- create table test(
-- 	id int not null primary key auto_increment,
--     a int not null,
--     b int not null
-- );

-- insert into test(a, b) values(3,5);
-- insert into test(a, b) values(8,7);
-- insert into test(a, b) values(6,2);
-- insert into test(a, b) values(2,1);
-- insert into test(a, b) values(4,5);






