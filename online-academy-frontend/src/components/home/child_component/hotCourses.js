import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SingleCarousel from '../../common/carousel/singleCarousel.js'
import './hotCourses.css'


export default function HotCourses() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} >
        <Grid container spacing={2}>

            <Grid item xs container direction="column" spacing={2} className={classes.leftContainer} >
              <div class="box">
                <div class="inner">
                  <span>My Academy</span>
                </div>
                <div class="inner">
                  <span>My Academy</span>
                </div>
              </div>
              <div className={classes.title}>
              <h3 class="text" >Chào mừng đến với My Academy 
              </h3>
              <h3 class="text" >Sẵn sàng cho những khóa học tuyệt vời</h3>
              </div>
            </Grid>

          <Grid item>
            <SingleCarousel coursesPath='hot?limit=5' /> 
          </Grid>

        </Grid>
      </Paper>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    display: 'flex',
    marginTop: 50,
    
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    background: '#77a4df'
    //height: 320
  },
  leftContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 50,
    maxWidth: 800
  },
  title:{
    marginTop: 40
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));