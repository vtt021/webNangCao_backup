import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CourseCard from '../courseCard/courseCard.js'
export default function SingleCarousel(props) {
    const classes = useStyles();
    const [items, setItems] = useState()
    const [teachers, setTeachers] = useState([{}])

    const getCouresItems = () => {
        const path = 'http://localhost:3001/api/courses/' + props.coursesPath;
        console.log(path)
        axios.get(path).then(res => {
            const listCourse = res.data;
            setItems(listCourse);
            console.log(listCourse);
        }).catch(error => console.log(error));
    }

    //TODO: LẤY DANH SÁCH KHÓA HỌC theo yêu cầu từ FE rồi để vào items nha
    useEffect(() => {
        getCouresItems()
    }, []);

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
                        <CourseCard key={i} courseInfo={item}/>
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