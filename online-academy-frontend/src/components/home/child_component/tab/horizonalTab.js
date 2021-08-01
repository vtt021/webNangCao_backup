import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import MultiCarousel from '../../../common/carousel/multiCarousel';
import MostViewCategories from './mostViewCategories';
export default function DetailPage(props) {
    const classes = useStyles();

    //const [email, setEmail] = useState("");

    useEffect(() => {

    }, []);


    return (

        <div className={classes.root}>
            <Grid container spacing={5} className={classes.container}>

                <Grid item xs={12} container className={classes.grid1} >
                    <Typography variant="h4" gutterBottom className={classes.underline}>
                        Khóa học mới:
                    </Typography>
                    <Paper className={classes.paper} >
                        <MultiCarousel categoryId={'courses/hot'} />
                    </Paper>
                </Grid>
                <Grid item xs={12} container className={classes.grid1} >
                    <Typography variant="h4" gutterBottom className={classes.underline}>
                        Được xem nhiều nhất:
                    </Typography>
                    <Paper className={classes.paper} >
                        <MultiCarousel categoryId={'courses/hot'} />
                    </Paper>
                </Grid>
                <Grid item xs={12} container className={classes.grid2} >
                    <Typography variant="h4" gutterBottom className={classes.underline} align='left'>
                        Lĩnh vực đăng ký nhiều nhất:
                    </Typography>
                    <Grid item xs={12}>
                        <MostViewCategories />
                    </Grid>

                </Grid>

            </Grid>
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    container: {
        flexGrow: 1,
        marginTop: '5%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        justify: 'flex-start',

    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        background: '#77a4df',
        width: '100%'
        //height: 320
    },
    underline: {
        borderBottom: '2px solid',
        paddingTop: '5%',


    },
    grid1: {
    },
    grid2: {

    },
    grid3: {
        marginTop: '20%'
    },
    list: {
        width: '100%'
    },
    listItem: {
        background: '#E6DDC6'
    }

}));