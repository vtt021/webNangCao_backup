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

    const [image, setImage] = useState()
    const getImage = async () =>{
        console.log(props.courseInfo._id)
        setImage(process.env.REACT_APP_API_MAIN + "/files/send?fileName=" + props.courseInfo.imageThumbnail)
        await axios.get(process.env.REACT_APP_API_MAIN + "/sub-categories/id?id=" + props.courseInfo.subCategoryId).then(res => {
            setSubName(res.data.subCategoryName)
        })
            .catch(error => console.log(error));
    }
    useEffect(() => {
        const init = async ()=>{
            await getImage()
        }
        init()
    }, []);

    const handleDetailPage = id => () => {
        console.log(id);
        window.location.href = "/detail/" + id
    };
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

                    {!props.courseInfo.salePrice && ( //Kh??ng c?? gi???m gi??
                        <container>
                            <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                                {props.courseInfo.price === '0'
                                    ? 'H???c ph??: ' + props.courseInfo.price
                                    : 'Mi???n ph??'
                                }
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" align='justify' className={classes.oldPrice} >
                            <br/>
                            </Typography>
                        </container>
                    )}

                    {props.courseInfo.salePrice != 0 && props.courseInfo.salePrice && ( // C?? gi???m gi??
                        <container>
                            <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                                {props.courseInfo.salePrice === '0'
                                    ? 'H???c ph??: ' + props.courseInfo.salePrice
                                    : 'Mi???n ph??'
                                }
                            </Typography>
                            {
                                props.courseInfo.salePrice === props.courseInfo.price
                                    ? <Typography gutterBottom variant="subtitle2" align='justify' className={classes.oldPrice} >
                                        {
                                            '( H???c ph?? g???c: ' + props.courseInfo.price + ' )'
                                        }
                                    </Typography>
                                    : <Typography gutterBottom variant="subtitle2" align='justify' className={classes.oldPrice} >
                                        <br/>
                                    </Typography>
                            }

                        </container>
                    )}
                    <Grid container justify="flex-start" className={classes.containerRating}>
                        <Rating name="half-rating-read" defaultValue={props.courseInfo.rating} precision={0.1} readOnly />
                        <Typography variant="body2" color="textSecondary" className={classes.numberRating}>
                            {'(' + props.courseInfo.ratingCount + ' ????nh gi??)'}
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