import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Link, Paper, Typography } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import userImage from '../common/images/potato.jpg'
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import PlayerControl from '../detail_page/component/videoPlayer';
export default function WatchVideoPage(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [courseDetail, setCoursesDetail] = useState({});

    const [content, setContent] = useState({});
    const getContent = async () => {
        await axios.get("http://localhost:3001/api/course-contents/id?contentId=" + id).then(res => {
            setContent(res.data)
            console.log(res.data)
        }).catch(error => console.log(error));
    }
    const getCourseDetail = async () => {
        await axios.get("http://localhost:3001/api/courses/id?id=" + content.courseId).then(res => {
            setCoursesDetail(res.data)
            console.log(res.data)
        }).catch(error => console.log(error))
    }

    useEffect(async () => {
        const init = async () => {
            await getContent()
        }
        init()
    }, []);

    useEffect(() => {
        const init = async () => {
            await getCourseDetail()
        }
        init()
    }, [content]);
    return (
        <div fluid>
            <Header />
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={12}>
                    <Typography align='left' variant='h4'>
                        {content.content}
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.videoContainer}>
                    <PlayerControl src={'http://localhost:3001/api/files/send?fileName=' + content.video} 
                        startTime={'15'}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.rightPaper}>
                        <Typography variant="h4" gutterBottom align='left'>
                            Xem chi tiết khóa học
                        </Typography>
                        <Link href={'/detail/' + courseDetail._id} onClick={{}} color="inherit">
                            <Typography gutterBottom align='left' variant="h5">
                             {courseDetail.courseName}
                            </Typography>
                        </Link>
                    </Paper>
                </Grid>

            </Grid>

            <Footer />
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        marginTop: 50,
        justifyContent: 'flex-start',
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    rightPaper: {
        padding: theme.spacing(2),
        background: '#FEF7DC',
        width: '100%',
        marginBottom: '5%',
    },
}));