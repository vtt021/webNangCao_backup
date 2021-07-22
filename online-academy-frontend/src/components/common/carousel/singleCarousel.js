import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CourseCard from '../courseCard/courseCard.js'
export default function SingleCarousel(props) {
    const classes = useStyles();
    const [items, setItems] = useState()
    const [teachers, setTeachers] = useState([{}])

    const getTeachers = () => {
        axios.get("http://localhost:3001/api/users/teacher").then(res => {
            const listTeacher = res.data;
            setTeachers(listTeacher);
            console.log(listTeacher)
        }).catch(error => console.log(error));
    }
    const getCourseItems = () => {
        const path = 'http://localhost:3001/api/courses/' + props.coursesPath;
        axios.get(path).then(res => {
            console.log(teachers)
            const listCourse = res.data;
            listCourse.forEach((item) => {
                teachers.forEach(element => {
                    if (element.id === item.teacherId) {
                        item.teacherId = element.username
                    }
                });
            })
            setItems(listCourse);
        }).catch(error => console.log(error));
    }

    //TODO: LẤY DANH SÁCH KHÓA HỌC theo yêu cầu từ FE rồi để vào items nha
    useEffect(() => {
        getTeachers()
    }, []);
    useEffect(() => {
        getCourseItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teachers]);

    return (
        <Grid
            className={classes.container}
            container
            justifyContent="center"
            alignItems="flex-start"
            justify="center" >
            <Carousel timeout='60'  animation = 'slide'>
                {items &&
                    items.map((item, i) =>
                        <CourseCard key={i} courseInfo={item} />
                    )
                }
                </Carousel>
        </Grid >

    )
}


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        marginTop: 20
    },
}));