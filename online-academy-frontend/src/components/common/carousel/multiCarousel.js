import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-material-ui-carousel'
import {  Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CourseCard from '../courseCard/courseCard.js'
export default function MultiCarousel(props) {
    const classes = useStyles();
    const [items, setItems] = useState()
    const [teachers, setTeachers] = useState([{}])

    const [carouselSlide, setCarouselSlide] = useState([])
    const [numEachSlide, setNumEachSlide] = useState(3)

    
    const getCourseItems = async () => {
        await axios.get(process.env.REACT_APP_API_MAIN + '/' + props.categoryId).then(res => {
            const listCourse = res.data;
            setItems(listCourse);
        }).catch(error => console.log(error));
    }
    const getSlide=()=>{
        const slideTemp = [];
        if (items) {
            setNumEachSlide(items.length > numEachSlide ? numEachSlide : items.length)
            for (let i = 0; i < items.length; i += numEachSlide) {
                if (i % numEachSlide === 0) {
                    slideTemp.push(
                        <Grid container justifyContent="center" justify="center" alignItems="flex-start" spacing={3}>
                            {
                                items.slice(i, i + numEachSlide).map((item, i) =>
                                (
                                    <Grid key={i} item>
                                        <CourseCard key={i} courseInfo={item} tag={3}/>
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
    }
    useEffect(() => {
        const init = async () =>{
            getCourseItems()
        }
        init()
     }, []);


    useEffect(() => {
        getSlide()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return (
        <Grid
        className={classes.container}
        container
        justifyContent="center"
        alignItems="flex-start"
        justify="center" >
            <Carousel animation="slide" interval='10000' >
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
        marginTop: 20
    },
}));