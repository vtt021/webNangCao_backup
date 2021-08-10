import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import CourseCard from '../../common/courseCard/courseCard.js'

export default function PagingRegisteredList(props) {
    const numEachPage = 6;
    const classes = useStyles();

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setmaxValue] = useState(numEachPage);
    const [page, setPage] = useState(1);
    

    const [items, setItems] = useState({})

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

    const getCouresItems = async () => {
        const path = 'http://localhost:3001/api/courses/hot?limit=6';
        console.log(path)
        await axios.get(path).then(res => {
            const listCourse = res.data;
            setItems(listCourse);
            console.log(listCourse);
        }).catch(error => console.log(error));
    }

    useEffect(() => {
        const init= async()=>{
            await getCouresItems()
        }
        init()
    }, []);
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
                        <Grid key={i} item>
                            <CourseCard key={i} courseInfo={item} />
                        </Grid>
                    )
                }
                {
                    items && items.length === 0 && (
                        <div> Chưa đăng ký khóa học nào</div>
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