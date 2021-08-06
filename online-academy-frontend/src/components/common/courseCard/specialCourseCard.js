import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';



export default function CourseCard(props) {
    const classes = useStyles();
    const history = useHistory();
    const [subCategoryName, setSubName] = useState()

    const [price,setPrice] = useState(<></>)
    const [image, setImage] = useState()
    useEffect(() => {
        console.log(props.courseInfo._id)
        setImage("http://localhost:3001/api/files/send?fileName=" + props.courseInfo.imageThumbnail)
        axios.get("http://localhost:3001/api/sub-categories/id?id=" + props.courseInfo.subCategoryId).then(res => {
            setSubName(res.data.subCategoryName)
        })
            .catch(error => console.log(error));
    }, [props.courseInfo]);


    useEffect(()=>{
        renderPrice()
    },[props.courseInfo])

    const handleDetailPage = id => () => {
        console.log(id);
        window.location.href = "/detail/" + id
    };

    const renderPrice=()=>{
        setPrice(handlePrice())
    }
    const handlePrice = () => {
        if (props.courseInfo.salePrice != props.courseInfo.price) {
            if (props.courseInfo.salePrice !== 0) {
                return (
                    <container>
                        <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                            {props.courseInfo.salePrice + ' VND'}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" align='justify' className={classes.oldPrice} >
                            {'Học phí gốc: ' + props.courseInfo.price + ' VND'}
                        </Typography>

                    </container>
                )
            }
            else {
                return (
                    <container>
                        <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                            {'Miễn phí'}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" align='justify' className={classes.oldPrice} >
                            {'Học phí gốc: ' + props.courseInfo.price + ' VND'}
                        </Typography>

                    </container>
                )
            }
        }
        else {
            if (props.courseInfo.salePrice !== 0) {
                return (
                    <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                        {props.courseInfo.salePrice + ' VND'}
                    </Typography>
                )
            }
            else {
                return (
                    <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                        {'Miễn phí'}
                    </Typography>
                )
            }
        }


    }
    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardActionArea onClick={handleDetailPage(props.courseInfo._id)}>
                    <CardHeader

                        title={props.courseInfo.courseName}
                        subheader={props.courseInfo.teacherName}

                        title={
                            <div>
                                <Typography noWrap gutterBottom variant="h6" component="h4" align='left'>
                                    {props.courseInfo.courseName}
                                </Typography>

                            </div>
                        }

                        subheader={
                            <Typography noWrap align='left'>
                                {props.courseInfo.teacherName}
                            </Typography>
                        }

                        className={classes.cardHeader}
                    />
                </CardActionArea>

                <CardMedia
                    className={classes.media}
                    image={image}
                    title={props.courseInfo.courseName}
                />

                <CardContent>

                   {price}
                    <Grid container justify="flex-start" className={classes.containerRating}>
                        <Rating name="half-rating-read" defaultValue={props.courseInfo.rating} precision={0.1} readOnly />
                        <Typography variant="body2" color="textSecondary" className={classes.numberRating}>
                            {'(' + props.courseInfo.ratingCount + ' đánh giá)'}
                        </Typography>
                    </Grid>
                    <Grid container justify="flex-end" alignItems='flex-end'>
                        {props.courseInfo.subCategoryId &&
                            (<Typography noWrap align='left' variant="overline">
                                {subCategoryName}
                            </Typography>)
                        }
                    </Grid>
                </CardContent>

            </Card>
        </div >
    );
}
const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    card: {
        width: 370,
        minHeight: 475,
        background: '#F9F9F9',
        border: '3px solid',
        borderTopColor: '#FE9898',
        borderBottomColor: '#E93B81',
        borderLeftColor: '#FE9898',
        borderRightColor: '#E93B81',

    },
    cardHeader: {
        textOverflow: "ellipsis",
        display: "block",
        overflow: "hidden",


    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        '& .MuiCardMedia-img': {
            objectFit: 'scale-down'
        }

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
    }
}));