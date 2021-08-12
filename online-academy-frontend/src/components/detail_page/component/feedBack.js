import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

export default function FeedBack(props) {
    const classes = useStyles();
    const imageString = 'http://localhost:3001/api/files/send?fileName='

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <ListItemText primary={props.username} secondary={props.rateContent} />
                    <Grid container justify="flex-start">
                        <Rating name="half-rating-read" defaultValue={props.rating} precision={0.1} readOnly />
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        background: '#E8F6EF',
    },

}));