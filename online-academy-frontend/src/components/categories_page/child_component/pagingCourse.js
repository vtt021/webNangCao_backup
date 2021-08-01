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



    //TODO: LẤY DANH SÁCH KHÓA HỌC TUỲ VÀO YÊU CẦU => TRUYỀN VÀO ITEMS ĐỂ HIỂN THỊ
    const getCourseItems = () => {
        let url = "http://localhost:3001/api/courses/"
        if (props.search) {
            url = url + "search"
        } else {
            if (props.subCategory != null) {
                url = url + "sub-category?subCategoryId=" + props.subCategory
            } else {
                url = url + "category?categoryId=" + props.categoryId
            }
        }
        if (props.search) {
            console.log('Search ne')
            console.log(url)
            
            axios.get(url, {
                    keyword: props.search
            }).then(res => {
                const listCourse = res.data;

                setItems(listCourse);
            }).catch(error => console.log(error));
        } else {
            console.log(url)
            axios.get(url).then(res => {
                const listCourse = res.data;

                setItems(listCourse);
            }).catch(error => console.log(error));
        }

    }

    useEffect(() => {
        getCourseItems()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <Grid
            className={classes.container}
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            justify="flex-start"
        >
            <Grid container justifyContent="center" justify="center" alignItems="flex-start" spacing={3}>
                {items && items.length > 0 &&
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
                {
                    items && items.length === 0 && (
                        <div> Không có khóa học thuộc lĩnh vực này</div>
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