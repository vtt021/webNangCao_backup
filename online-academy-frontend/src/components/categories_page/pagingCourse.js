
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import CourseCard from '../common/courseCard/courseCard.js'

export default function PagingCard(props) {
    const numEachPage = 6;
    const classes = useStyles();

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setmaxValue] = useState(numEachPage);
    const [page, setPage] = useState(1);

    const [items, setItems] = useState()
    const [teachers, setTeachers] = useState()

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

    const getTeachers = () => {
        axios.get("http://localhost:3001/api/users/teacher").then(res => {
            const listTeacher = res.data;
            setTeachers(listTeacher);
            console.log(listTeacher)
        }).catch(error => console.log(error));
    }
    
    //TODO: LẤY DANH SÁCH KHÓA HỌC THEO categoryId rồi để vào items nha- 
    const getCouresItems = () => {
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
    }
    useEffect(() => {
        getTeachers()
    }, []);
    useEffect(() => {
        getCouresItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [teachers]);

    return (
        <Grid
            className={classes.container}
            container
            justifyContent="center"
            alignItems="flex-start"
            justify="center"
        >
            <Grid container justifyContent="center" justify="center" alignItems="flex-start" spacing={3}>
                {items && items.length &&
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
        marginTop: 20
    },
    paginControler: {
        display: "flex",
        marginTop: 20,
    },

}));