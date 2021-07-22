
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import CourseCard from '../../common/courseCard/courseCard.js'
import SpecialCourseCard from '../../common/courseCard/specialCourseCard.js';
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

    //TODO: LẤY DANH SÁCH KHÓA HỌC TUỲ VÀO YÊU CẦU => TRUYỀN VÀO ITEMS ĐỂ HIỂN THỊ
    const getCourseItems = () => {
        axios.get("http://localhost:3001/api/courses/hot").then(res => {
            console.log(teachers)
            console.log(res.data)
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
        getCourseItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teachers]);

    return (
        <Grid
            className={classes.container}
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            justify="flex-start"
        >
            <Grid container justifyContent="center" justify="center" alignItems="flex-start" spacing={3}>
                {items && items.length &&
                    items.slice(minValue, maxValue).map((item, i) =>
                        i % 2 === 0 /*TODO: Kiểm tra là khoá học mới đăng 
                                    hoặc các khoá học có nhiều học viên đăng ký học (Best Seller) 
                                    sẽ có thể hiện khác với các khoá học còn lại*/
                            ? (
                                <Grid key={i} item>
                                    <CourseCard key={i} courseInfo={item} />
                                </Grid>
                            )
                            : (
                                <Grid key={i} item >
                                    <SpecialCourseCard key={i} courseInfo={item} />
                                </Grid>
                            )

                    )
                }
            </Grid>

            <Grid container justifyContent="center" justify="center" alignItems="flex-start" spacing={3} className={classes.paginControler}>
                {
                    items &&
                    <Pagination count={Math.ceil(items.length / numEachPage)} page={page} onChange={handleChange} />
                }
            </Grid>
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
    }


}));