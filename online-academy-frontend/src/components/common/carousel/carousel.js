import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
export default function HomeCarousel(props) {
    const classes = useStyles();
    //TODO: GỌI API LẤY CÁC KHÓA HỌC HOT RỒI GÁN VÀO MAP items NÀY NHA.
    var items = [
        {
            imageThumbnail: "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
            courseName: "Mèo số 1",
            detailShort: "Đây là con mều nhà em",

        },
        {
            imageThumbnail: "https://thumbs-prod.si-cdn.com/nnJARGtKrLypH4y3Vov2zGTG4xw=/fit-in/1600x0/filters:focal(554x699:555x700)/https://public-media.si-cdn.com/filer/a4/04/a404c799-7118-459a-8de4-89e4a44b124f/img_1317.jpg",
            courseName: "Mèo số 2",
            detailShort: "Nó cũng là con mèo nhà e",
        }
    ]

    return (
        <Container maxWidth="md">
            <Typography className={classes.typo}>
                CÁC KHÓA HỌC NỔI BẬT
            </Typography>
            <Carousel timeout='15' navButtonsAlwaysVisible='true' animation='slide' className={classes.carousel}>
                {
                    items.map((item, i) => <Item key={i} couresInfo={item} />)
                }
            </Carousel>
        </Container>

    )
}

function Item(props) {
    const classes = useStyles();
    return (
        <div className={classes.cardCarousel}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.couresInfo.imageThumbnail}
                        title={props.couresInfo.courseName}
                    />
                    <CardContent className={classes.content}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.couresInfo.courseName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.content} align='justify'>
                            {props.couresInfo.detailShort}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="30" color="primary">
                        Xem
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
const useStyles = makeStyles({
    root: {
        minWidth: 200,
        maxWidth: 500,
        marginTop: 20
    },
    media: {
        height: 150,
    },
    content: {
        height: 100,
    },
    detail: {
        height: 60,
        
    },
    cardCarousel: { display: 'flex', justifyContent: 'center' },
    carousel: {
        maxWidth: 'sm',
        maxHeight: 'sm',
        minHeight: 'sm',
    },
    typo: {
        marginTop: 20,
        color: 'red',
        alignContent: 'left',
        fontWeight: 'bold',
        fontSize: 20,
    }

});