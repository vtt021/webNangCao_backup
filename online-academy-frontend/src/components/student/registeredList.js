import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import PagingCard from '../categories_page/child_component/pagingCourse';
import { Typography } from '@material-ui/core';
import PagingRegisteredList from './child_component/pagingList';
export default function RegistedList(props) {
    const classes = useStyles();

    // const [categoryName, setName] = useState("")


    // const getName = async () => {
    //     await axios.get("http://localhost:3001/api/categories/id?id=60ef0789f83a7030481c3932").then(res => {
    //         const listCategories = res.data;
    //         // setName(res.data.categoryName)
    //         console.log(res.data)
    //     })
    //         .catch(error => console.log(error));
    // }
    // useEffect(() => {
    //     const init = async () => {
    //         await getName()
    //     }
    //     init()
    // }, []);
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs='12' container direction="column" spacing={2} >
                    <div style={{ display: "flex" }}>
                        <Typography variant='h5' style={{ marginRight: "auto", borderBottom: '2px solid' }}>
                            Các khóa học đã đăng ký
                        </Typography>
                    </div>

                    <PagingRegisteredList />
                </Grid>

            </Grid>
        </div>


    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '2%',
        paddingRight: '2%',
        
    },
    container:
    {
        display: 'flex',
        
    },
    underline: {
        borderBottom: 'solid',
    },

}));