import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import { useForm } from "react-hook-form";
import Link from '@material-ui/core/Link';
import ImageUploadCard from './child_component/uploadImage';
import UploadContent from './child_component/uploadContent';
import UploadVideo from './child_component/uploadVideo';
export default function UploadCourse(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [selectedFile, setSelectedFile] = useState(null);


    const onSubmit = data => {
        console.log(data)
        console.log('Hình nè: ' + selectedFile)
        //Hiển thị hình 
        //------------
            // < img  
            // src = { selectedFile }
            //     />
        //------------
        // axios.post("http://localhost:3001/api/users", {
        //     email: data.email,
        //     password: data.password,
        //     username: data.username
        // }).then(res => {
        //     window.location.replace("/verify-otp/" + data.email)

        // })
        //     .catch(error => console.log(error));
    }

    return (
        <div fluid>

            <Header />

            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12}>
                    <h2>
                        Đăng khóa học mới
                    </h2>
                </Grid>
                <Grid item xs={1}>
                </Grid>

                <Grid item xs={3}>
                    <ImageUploadCard selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </Grid>
                <Grid item xs={7}>
                    <UploadContent onSubmit={onSubmit} />
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={12}>
                    {/* <UploadVideo /> */}
                </Grid>

            </Grid>
            <Container component="main" maxWidth="xs">
            </Container>


            <Footer />
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
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
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}