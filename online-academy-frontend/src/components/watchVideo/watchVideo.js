import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Typography } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import userImage from '../common/images/potato.jpg'
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import PlayerControl from '../detail_page/component/videoClass';
export default function WatchVideoPage(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [searchText, setSearchText] = useState(props.id ? '' : props.id);

    return (
        <Container fluid>
            <Header />
            <Grid container spacing={2} className={classes.container}>
                <Grid item xs={12}>
                    <Typography align='left' variant='h4'>
                        Tên bài giảng
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.videoContainer}>
                    <PlayerControl src='http://localhost:3001/api/files/send?fileName=1_3.mp4' />
                </Grid>
                <Grid item xs={4}>
                    
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