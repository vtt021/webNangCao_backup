import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    card: {
        width: 370,
    },
    cardHeader: {
        height: 100,
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        
        
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
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

export default function CourseCard(props) {
    const classes = useStyles();


    return (
        <div className={classes.container}>
            <Card className={classes.card}>
                <CardActionArea>
                    <CardHeader
                        title={props.couresInfo.subCategoryId + ': ' + props.couresInfo.courseName}
                        subheader={props.couresInfo.teacherId}
                        className={classes.cardHeader}
                    />
                </CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.couresInfo.imageThumbnail === null ? 'https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop' : props.couresInfo.imageThumbnail}
                    title={props.couresInfo.courseName}
                />
                <CardContent>

                    {!props.couresInfo.salePrice && ( //Không có giảm giá
                        <container>
                            <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                                {'Học phí: ' + props.couresInfo.price}
                            </Typography>
                            <Typography >
                                {'\u00A0'}
                            </Typography>
                        </container>
                    )}
                    {props.couresInfo.salePrice && ( // Có giảm giá
                        <container>
                            <Typography gutterBottom variant="h6" align='justify' className={classes.price}>
                                {'Học phí: ' + props.couresInfo.price}
                            </Typography>
                            <Typography gutterBottom variant="subtitle2" align='justify' className={classes.oldPrice} >
                                {'( Học phí gốc: ' + props.couresInfo.price + ' )'}
                            </Typography>
                        </container>
                    )}


                    <Grid container justify="flex-start" className={classes.containerRating}>
                        <Rating name="half-rating-read" defaultValue={props.couresInfo.rating} precision={0.1} readOnly />
                        <Typography variant="body2" color="textSecondary" className={classes.numberRating}>
                            {'(' + props.couresInfo.ratingCount + ' đánh giá)'}
                        </Typography>
                    </Grid>
                </CardContent>

            </Card>
        </div>
    );
}
