import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import CheckIcon from '@material-ui/icons/Check';
import defaultImage from '../../common/images/testImage.jpg'
import axios from 'axios';

export default function CourseInfo(props) {
    const classes = useStyles();
    const imageString = process.env.REACT_APP_API_MAIN + '/files/send?fileName='





    const handleChangeLove = async (event) => {
        await props.handleChangeLove(event);
    };

    const handleBuyCourse = async (event) => {
        // if (isBought) {
        //     return;
        // }
        await props.handleBuyCourse();

    };



    const handleUIBuyCourse = () => {
        if (props.isBought == false) {
            return (
                <FormControlLabel
                    control={
                        <ShoppingCartOutlinedIcon className={classes.iconSize} />
                    }
                    label={"Mua khóa học"}
                    className={classes.loveContainer}
                />
            )
        }
        else {
            return (
                <FormControlLabel
                    control={
                        <CheckIcon className={classes.iconSize} />
                    }
                    label={"Đã mua khóa học"}
                    className={classes.loveContainer}
                />
            )
        }
    }

    const convertDate = (current) => {
        let date = new Date(current)
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();

        let today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={4} className={classes.image}>
                        <img className={classes.img} alt="complex" src={props.courseInfo.imageCourse ? imageString + props.courseInfo.imageCourse : defaultImage} />
                    </Grid>

                    <Grid item xs={8} container style={{ paddingLeft: '2%' }}>
                        <Grid item xs container direction="column" spacing={2} alignItems='flex-start'>
                            <Grid item xs container direction="column" spacing={2}
                                style={{ display: 'flex', justify: 'flex-start', alignItems: 'flex-start' }}>
                                <Typography gutterBottom variant="h3" align='left'>
                                    {props.courseInfo ? props.courseInfo.courseName : 'Tên khóa học'}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    {props.courseInfo ? props.courseInfo.detailShort : 'Mô tả ngắn'}
                                </Typography>
                            </Grid>

                            <Grid item xs container direction='column' spacing={2} alignItems='flex-start' justifyContent='flex-start'>
                                {!props.courseInfo.salePrice && ( //Không có giảm giá
                                    <container>
                                        <Typography gutterBottom variant="h5" align='justify' className={classes.price}>
                                            {props.courseInfo.price === '0'
                                                ? 'Học phí: ' + props.courseInfo.price
                                                : 'Miễn phí'
                                            }
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" align='justify' className={classes.oldPrice} >
                                            <br />
                                        </Typography>
                                    </container>
                                )}

                                {props.courseInfo.salePrice != 0 && props.courseInfo.salePrice && ( // Có giảm giá
                                    <container>
                                        <Typography gutterBottom variant="h5" align='justify' className={classes.price}>
                                            {props.courseInfo.salePrice === '0'
                                                ? 'Học phí: ' + props.courseInfo.salePrice
                                                : 'Miễn phí'
                                            }
                                        </Typography>
                                        {
                                            props.courseInfo.salePrice === props.courseInfo.price
                                                ? <Typography gutterBottom variant="subtitle1" align='justify' className={classes.oldPrice} >
                                                    {
                                                        '( Học phí gốc: ' + props.courseInfo.price + ' )'
                                                    }
                                                </Typography>
                                                : <Typography gutterBottom variant="subtitle1" align='justify' className={classes.oldPrice} >
                                                    <br />
                                                </Typography>
                                        }

                                    </container>
                                )}
                                <Grid container justify="flex-start" className={classes.containerRating}>
                                    <Rating name="half-rating-read" defaultValue={props.courseInfo.rating} precision={0.1} readOnly />
                                    <Typography variant="body2" color="textSecondary" className={classes.numberRating}>
                                        {'(' + (props.courseInfo.ratingCount ? props.courseInfo.ratingCount : '0') + ' đánh giá)'}
                                    </Typography>
                                </Grid>

                                <Grid container justify="flex-start" className={classes.buttonContainer} >
                                    <Button variant="outlined" color="primary"
                                        className={classes.button2}
                                        disabled={props.isBought}
                                        onClick={handleBuyCourse}>
                                        {
                                            handleUIBuyCourse()
                                        }
                                    </Button>

                                    <Button variant="outlined" color="primary" className={classes.button1}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                                                    className={classes.iconSize} style={{ backgroundColor: 'transparent' }}
                                                    onChange={handleChangeLove} checked={props.isFavorite} />
                                            }
                                            label="Yêu thích"
                                            className={classes.loveContainer}
                                        />
                                    </Button>

                                </Grid>

                                <Grid container justify="flex-end"  >
                                    <Typography gutterBottom variant="subtitle2">
                                        {props.courseInfo ? "Được tạo từ ngày: " + convertDate(props.courseInfo.createdDate) : '1/1/2021'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        marginTop: 50,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        background: '#DEEDF0',
        minHeight: 480
    },
    image: {
        width: 480,
        height: 480,
        display: 'flex',
        alignItems: 'center',
        justify: 'center'
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'scale-down'
    },
    price: {
        color: '#5EAAA8',
    },
    oldPrice:
    {
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        color: '#F05945',
    },
    containerRating: {
        alignItems: "center",
    },
    numberRating: {
        marginLeft: 10
    },
    buttonContainer: {
        margin: 'auto',
    },
    button2: {

    },
    button1: {
        marginLeft: '5%'
    },
    loveContainer: {
        margin: 'auto',
        paddingLeft: 5,
        paddingRight: 10,
        '& .MuiFormControlLabel-label':
        {
            marginLeft: 10
        }
    },
    iconSize: {
        transform: "scale(1.5)",
    },
}));