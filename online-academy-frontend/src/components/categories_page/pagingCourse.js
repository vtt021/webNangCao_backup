
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import CourseCard from '../common/courseCard/courseCard.js'
import { Container } from 'react-bootstrap';

export default function PagingCard(props) {
    const numEachPage = 6;
    const classes = useStyles();

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setmaxValue] = useState(numEachPage);
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        if (value < 0) {
            console.log('error: current page is smaller 0')
        }
        else {
            setPage(value);
            setMinValue(numEachPage * (value - 1));
            setmaxValue(value * numEachPage)
        }
    };

    const [items, setItems] = useState()
    const [teachers, setTeachers] = useState([{}])


    //TODO: LẤY DANH SÁCH KHÓA HỌC THEO props.categories rồi bỏ vô items nha
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


    return (
        <Grid
            className={classes.container}
            container
            justifyContent="center"
            alignItems="center"
            justify="center"
        >
            <Grid container justifyContent="center" justify="center" alignItems="center" spacing={3}>
                {   items  && items.length &&
                        items.slice(minValue, maxValue).map((item, i) =>
                        (
                            <Grid key={i} item>
                                <CourseCard key={i} couresInfo={item} />
                            </Grid>
                        )
                        )
                }
            </Grid>
            {
                items &&             
                <Pagination className={classes.paginControler} count={Math.ceil(items.length / numEachPage)} page={page} onChange={handleChange} />
            }

        </Grid>
    );
}
const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
    },
    paginControler: {
        display: "flex",
        marginTop: 20,
    },

}));