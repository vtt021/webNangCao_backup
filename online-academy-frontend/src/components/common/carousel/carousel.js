import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import {  Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CourseCard from '../courseCard/courseCard.js'
export default function HomeCarousel(props) {
    const classes = useStyles();
    const [items, setItems] = useState()
    const [teachers, setTeachers] = useState([{}])

    const [carouselSlide, setCarouselSlide] = useState([])
    const [numEachSlide, setNumEachSlide] = useState(3)


    //TODO: GỌI DATABASE BỎ VÀO items ĐỂ HIỂN THỊ 
    useEffect(() => {
        axios.get("http://localhost:3001/api/users/teacher").then(res => {
            const listTeacher = res.data;
            setTeachers(listTeacher);
            console.log(listTeacher)
        }).catch(error => console.log(error));


        axios.get("http://localhost:3001/api/courses/hot").then(res => {
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
    }, []);

    useEffect(() => {
        const slideTemp = [];
        if (items) {
            setNumEachSlide(items.length > numEachSlide ? numEachSlide : items.length)
            for (let i = 0; i < items.length; i += numEachSlide) {
                if (i % numEachSlide === 0) {
                    slideTemp.push(
                        <Grid container justifyContent="center" justify="center" alignItems="center" spacing={3}>
                            {
                                items.slice(i, i + numEachSlide).map((item, i) =>
                                (
                                    <Grid key={i} item>
                                        <CourseCard key={i} couresInfo={item} />
                                    </Grid>

                                )
                                )
                            }
                        </Grid>
                    )
                }
            }
            setCarouselSlide(slideTemp);
        }
        else {
        }
    }, [items]);

    return (
        <Grid
        className={classes.container}
        container
        justifyContent="center"
        alignItems="center"
        justify="center" >
            <Carousel timeout='15' navButtonsAlwaysVisible='true' animation="slide" >
                {
                    carouselSlide
                }
            </Carousel>
            </Grid >

    )
}


const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
    }
}));