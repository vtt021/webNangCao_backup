import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import Header from '../common/header/header';
import CourseInfo from './component/courseInfo';
import Footer from '../common/footer/footer';
import Accordions from './component/accordion';
import MultiCarousel from '../common/carousel/multiCarousel';
import FeedBack from './component/feedBack';
export default function DetailPage(props) {
    const classes = useStyles();

    const id = props.match.params.id

    return (
        <div fluid>

            <Header />
            <Grid className={classes.root}>
                <CourseInfo courseInfo={''} />
                <Grid container spacing={2} className={classes.container}>

                    <Grid item xs={9} container className={classes.grid1} >
                        <Paper className={classes.leftPaper} >
                            <Typography variant="h6" gutterBottom align='left' >
                                Giới thiệu khóa học: MÔ TẢ DÀI
                            </Typography>
                        </Paper>
                        <Typography variant="h4" gutterBottom className={classes.underline}>
                            Đề cương khóa học
                        </Typography>
                        <Accordions courseId='truyền vô để lấy thông tin đề cương, các bài giảng' />
                    </Grid>

                    <Grid item xs={3} container className={classes.grid2}>
                        <Paper className={classes.rightPaper}>
                            <Typography variant="h6" gutterBottom align='left'>
                                Thông tin giảng viên
                            </Typography>
                            <Typography gutterBottom align='left'>
                                Giảng viên: tên giảng viên
                            </Typography>
                            <Typography gutterBottom align='left'>
                                Địa chỉ liên hệ: abc@gmail.com
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={9} container className={classes.grid3}>
                        <Typography variant="h4" gutterBottom align='left' className={classes.underline}>
                            Đánh giá từ học viên
                        </Typography>
                        <List className={classes.list}>
                            <ListItem alignItems="flex-start" className={classes.listItem}>
                                <FeedBack />
                            </ListItem>
                            <ListItem alignItems="flex-start" className={classes.listItem}>
                                <FeedBack />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} container  >
                        <Typography variant="h4" gutterBottom align='left' className={classes.underline}>
                            Khóa học cùng lĩnh vực được quan tâm
                        </Typography>
                        <MultiCarousel categoryId={''} />
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
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
        marginTop: 50,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        justify: 'flex-start',

    },
    leftPaper: {
        padding: theme.spacing(2),
        background: '#E6DDC6',
        width: '100%',
        marginBottom: '5%',
    },
    rightPaper: {
        padding: theme.spacing(2),
        background: '#FEF7DC',
        width: '100%',
        marginBottom: '5%',
    },
    underline: {
        borderBottom: '2px solid',

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