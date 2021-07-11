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
	isUnlocked boolean not null default false,
    lastUpdated timestamp default current_timestamp
);

insert into users (email, username, password, role, isUnlocked) values ("admin@xyz.com",	"admin",	"$2b$10$/B/ej6GDxDYetcitwzwKm.cKNxeUViuIreXaZwFzFrt0Uie.deb9K",2,1);
insert into users (email, username, password, role, isUnlocked) values ("teacher1@xyz.com",	"Quách Bảo",	"$2b$10$IPloV6Kx781O6aLKC7arue1bwCcQbJP8dwQujRNj2iOb5r8gRPfK6",1,1);
insert into users (email, username, password, role, isUnlocked) values ("teacher2@xyz.com",	"Đỗ Khanh",	"$2b$10$ada1h04Qk7tLosRAmW/M7ejLfxdFR8OnxKEU6ZmnxDBfB7oJFYyXK",1,1);
insert into users (email, username, password, role, isUnlocked) values ("user1@xyz.com",	"Phụng Diễm Ân",	"$2b$10$uJ1sM6KhrJ.GpY/8Txy0SutI/AeuZJcVfM3.qBZJj0Ic8WZcPM2XW",0,1);
insert into users (email, username, password, role, isUnlocked) values ("user2@xyz.com",	"Trần Văn Hoàng",	"$2b$10$b1qChoJWvb4edoO90zBie.aVPmUq7.gjg6QwJjE7DRlssYnYniC.K",0,1);
insert into users (email, username, password, role, isUnlocked) values ("user3@xyz.com",	"Nguyễn Thị Lệ Xuân",	"$2b$10$RSWv.yxhkZFEfFnKLRioyO8XUjuaYqiPRbspS1cM6d5HzFwP8XnY6",0,1);
insert into users (email, username, password, role, isUnlocked) values ("teacher3@xyz.com",	"Cao Mai Loan",	"$2b$10$qq3dLGDtlMrZ4QUklIN4GeIcV75wRoRWrouFcjZDS1p02AJhahyT6",1,1);
insert into users (email, username, password, role, isUnlocked) values ("user4@xyz.com",	"Đặng Văn Hùng",	"$2b$10$TJeZYxJK19HUM.dxMNRXUu6WDp/LKNTesxD20wyYSIJqSlrCdpG8y",0,1);
insert into users (email, username, password, role, isUnlocked) values ("user5@xyz.com",	"Đinh Lệ Nga",	"$2b$10$OXviD8qS9qoDyKgauxFSbejoRWs21u.KhaFklkt987abAsR4LLnQK",0,1);
insert into users (email, username, password, role, isUnlocked) values ("user6@xyz.com",	"Lý Trọng Hà",	"$2b$10$fu.5rku/Y5zmw9XfNYAapeX8d78dOZuF46fcsIK8k2tqFhBjWlwVa",0,1);



create table category (
	id int not null primary key auto_increment,
    categoryName varchar(255) not null,
    isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp
);

insert into category (categoryName) values("Tin học");
insert into category (categoryName) values("Toán");
insert into category (categoryName) values("Tiếng Anh");
-- insert into category (categoryName) values("Hóa"); 

create table sub_category (
	categoryId int not null,
	id int not null auto_increment,
    subCategoryName char(255) character set utf8mb4 not null unique,
    isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp,
    primary key (id),
    constraint FK_SubCategory_Category foreign key (categoryId) references category(id)
);

insert into sub_category (categoryId, subCategoryName) values(1, "Ngôn ngữ lập trình");
insert into sub_category (categoryId, subCategoryName) values(1, "Kiến thức chung");
insert into sub_category (categoryId, subCategoryName) values(2, "Phổ thông");
insert into sub_category (categoryId, subCategoryName) values(3, "Vocabulary");



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

insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Giới thiệu về Git", 2, 2, 0, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Thành thạo ReactJS trong 24 giờ", 1, 2, 15000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Competitive Programming with Errichto", 2, 2, 0, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Early Math - Geometry - Khan Academy", 3, 3, 30000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Flutter căn bản", 1, 3, 50000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Decoding Flutter", 1, 3, 50000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Google Search and its uses", 3, 7, 50000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Software Development Methodology - Codecademy", 1, 2, 50000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("BBC Learning English - Vocabulary", 4, 7, 50000, "abcd", "abcd");
insert into course(courseName, subCategoryId, teacherId, price, detailShort, detailLong) values ("Angular Tutorial", 1, 3, 50000, "abcd", "abcd");


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
insert into course_content(courseId, content, video, isPreview) values(1, "Tổng quan khóa học", "1_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(1, "Giới thiệu về vcs", "1_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(1, "Giới thiệu về git", "1_3.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(1, "Cách cài đặt", "1_4.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(2, "Giới thiệu ReactJS căn bản", "2_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(2, "Thử viết ứng dụng trên editor online", "2_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(2, "Let và const", "2_3.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(3, "Binary Search tutorial C and Python", "3_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(3, "Bitwise Operations tutorial 1  XOR Shift Subsets", "3_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(3, "C Bitsets in Competitive Programming", "3_3.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(4, "Halves and fourths Geometry Early Math Khan Academy", "4_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(4, "Compose shapes Geometry Early Math Khan Academy", "4_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(4, "Cousin Fals shape collection Geometry Early Math Khan Academy", "4_3.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(5, "Giới thiệu tổng quan khóa học", "5_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(5, "Kiến thức chung về ứng dụng Mobile", "5_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(5, "Giới thiệu ngôn ngữ Dart", "5_3.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(6, "Hot reload  Decoding Flutter", "6_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(6, "Introducing Decoding Flutter", "6_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(6, "Life of a Widget  Decoding Flutter", "6_3.mp4", false);

insert into course_content(courseId, content, video, isPreview) values(7, "How Google Search continues to improve results", "7_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(7, "How Google Search Works in 5 minutes", "7_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(7, "How real people make Google Search better", "7_3.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(7, "How Autocomplete works on Google Search", "7_4.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(7, "How your location makes Google Search more helpful", "7_5.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(7, "How Google keeps you safe on Search", "7_6.mp4", false);-- 

insert into course_content(courseId, content, video, isPreview) values(8, "Software Development Methodology What is Agile", "8_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(8, "What is a Sprint", "8_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(8, "What is DRY", "8_3.mp4", false);

insert into course_content(courseId, content, video, isPreview) values(9, "Treasure Island part one - Uses of time", "9_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(9, "Vocabulary - 5 uses of out - Macbeth part 1", "9_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(9, "Vocabulary - four uses of right - Emma part 1", "9_3.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(10, "Angular Tutorial 1 - Introduction_360p", "10_1.mp4", true);
insert into course_content(courseId, content, video, isPreview) values(10, "Angular Tutorial 2  Getting Started", "10_2.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(10, "Angular Tutorial 3  Hello World App", "10_3.mp4", false);
insert into course_content(courseId, content, video, isPreview) values(10, "Angular Tutorial 4 - Components", "10_4.mp4", false);



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

-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (1, 1, true, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (1, 2, true, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (3, 3, false, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (2, 1, false, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (4, 6, false, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (5, 2, false, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (5, 1, false, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (4, 8, false, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (1, 9, false, 1, "nice");
-- insert into register_course(courseId, userId, isFavorite, rating, rateContent) values (3, 10, false, 1, "nice");

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
    currentTime int not null default 0 check (currentTime >= 0),
    
	isDeleted boolean not null default false,
    lastUpdated timestamp default current_timestamp,
    primary key (courseId, userId, contentId),
    constraint FK_CourseIdUserId_RegisterCourse foreign key (courseId, userId) references register_course(courseId, userId),
    constraint FK_ContentId_CourseContent foreign key (contentId) references course_content(id)
);

-- insert into register_course_detail(courseId, userId, contentId, currentTime) values(1, 1, 1,20);
-- insert into register_course_detail(courseId, userId, contentId, currentTime) values(1, 1, 2,50);
-- insert into register_course_detail(courseId, userId, contentId, currentTime) values(1, 1, 3,30);
-- insert into register_course_detail(courseId, userId, contentId, currentTime) values(1, 1, 4,20);
-- insert into register_course_detail(courseId, userId, contentId, currentTime) values(1, 1, 5,10);

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






