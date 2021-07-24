import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Paper,Typography } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import userImage from '../common/images/potato.jpg'
import Header from '../common/header/header';
import CourseInfo from './component/courseInfo';
import Footer from '../common/footer/footer';
import Accordions from './component/accordion';
import VideoPlayer from './component/videoPlayer';
export default function DetailPage(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [searchText, setSearchText] = useState(props.id ? '' : props.id);

    return (
        <Container fluid>

            <Header />
            <CourseInfo courseInfo={''} />
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={9} container >
                    <Typography variant="h4" gutterBottom >
                        Đề cương khóa học
                    </Typography>

                    <Accordions courseId='truyền vô để lấy thông tin đề cương' />
                    
                </Grid>
                <Grid item xs={3} >
                    {/*Sẽ chèn thêm cái gì đó vào cho đỡ trống nếu rảnh :v */}
                </Grid>
            </Grid>
            

            <Footer />
        </Container>
    )
}
const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        marginTop: 50,
        justifyContent: 'flex-start'
    },

}));