DROP DATABASE IF EXISTS philit;

create database philit;

use philit;

create table user (
id int not null auto_increment,
username VARCHAR(30) not null,
PASSWORD VARCHAR(30), 
first_name  VARCHAR(30),
last_name  VARCHAR(30),

e_mail VARCHAR(30),
birth date NOT NULL,
major VARCHAR(30),
picture VARCHAR(30) , 
PRIMARY KEY (id),
course_level int DEFAULT 1,
exam_taken boolean default no, 
exam_score int 

);
create table course_material (
id int not null auto_increment,
material_type VARCHAR(30),
title VARCHAR(30),
chapter_title VARCHAR(30),
chapter_number int not null,
week_number int not null,
order_in_chapter int not null,
material_data text

);

create table question (
id int not null auto_increment,
question text,
week_number int not null,

);
