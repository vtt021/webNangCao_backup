
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
    const [subCategoryName,setSubName] = useState("")

    const [image, setImage] = useState('https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop')
    useEffect(() => {
        setImage("http://localhost:3001/api/files/send?fileName=" + props.courseInfo.imageThumbnail)
        axios.get("http://localhost:3001/api/sub-categories/id?id="+props.courseInfo.subCategoryId).then(res => {
            setSubName(res.data.subCategoryName)
        })
            .catch(error => console.log(error));
    }, []);

    const handleDetailPage = id => () => {
        console.log(id);
        history.push("/detail/" + id);
    };
    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardActionArea onClick={handleDetailPage(props.courseInfo._id)}>
                <CardHeader

                    title={props.courseInfo.courseName}
                    subheader={props.courseInfo.teacherName}

                    title={
                        <Typography noWrap gutterBottom variant="h6" component="h4" align='left'>
                            {props.courseInfo.subCategoryId !== undefined
                                ? subCategoryName + ': ' + props.courseInfo.courseName
                                : props.courseInfo.courseName

                            }
                        </Typography>
                    }
                    //subheader={props.courseInfo.teacherId}

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

                {!props.courseInfo.salePrice && ( //Không có giảm giá
                    <container>
                        <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                            {'Học phí: ' + props.courseInfo.price}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" align='justify' className={classes.oldPrice} >
                            {'\u00A0'}
                        </Typography>
                    </container>
                )}

                {props.courseInfo.salePrice != 0 && props.courseInfo.salePrice && ( // Có giảm giá
                    <container>
                        <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                            {'Học phí: ' + props.courseInfo.salePrice}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2" align='justify' className={classes.oldPrice} >
                            {'( Học phí gốc: ' + props.courseInfo.price + ' )'}
                        </Typography>
                    </container>
                )}
                <Grid container justify="flex-start" className={classes.containerRating}>
                    <Rating name="half-rating-read" defaultValue={props.courseInfo.rating} precision={0.1} readOnly />
                    <Typography variant="body2" color="textSecondary" className={classes.numberRating}>
                        {'(' + props.courseInfo.ratingCount + ' đánh giá)'}
                    </Typography>
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
        background: '#F9F9F9',

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