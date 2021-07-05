import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CourseCard from '../courseCard/courseCard.js'
export default function HomeCarousel(props) {
    const classes = useStyles();
    //TODO: GỌI API LẤY CÁC KHÓA HỌC HOT RỒI GÁN VÀO MAP items NÀY NHA.
    var items = [
        {
            imageThumbnail: "https://images.theconversation.com/files/350865/original/file-20200803-24-50u91u.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
            courseName: "Mèo số 1",
            rating: 3.7,
            ratingCount: 57,
            teacherId: 'Tên giảng viên',
            subCategoryId: 'Tên lĩnh vực',
            price: 200000,
            salePrice: 100000

        },
        {
            imageThumbnail: "https://thumbs-prod.si-cdn.com/nnJARGtKrLypH4y3Vov2zGTG4xw=/fit-in/1600x0/filters:focal(554x699:555x700)/https://public-media.si-cdn.com/filer/a4/04/a404c799-7118-459a-8de4-89e4a44b124f/img_1317.jpg",
            courseName: "Mèo số 2",
            rating: 4,
            ratingCount: 63,
            teacherId: 'Tên giảng viên',
            subCategoryId: 'Tên lĩnh vực',
            price: 300000
        }
    ]

    return (
        <Container >
            <Typography className={classes.typo}>
                CÁC KHÓA HỌC NỔI BẬT
            </Typography>
            <Carousel timeout='15' navButtonsAlwaysVisible='true' animation='slide' >
                {
                    items.map((item, i) => <CourseCard key={i} couresInfo={item} />)
                }
            </Carousel>
        </Container>

    )
}


const useStyles = makeStyles((theme) => ({
   
    typo: {
        marginTop: 20,
        color: 'red',
        alignContent: 'left',
        fontWeight: 'bold',
        fontSize: 20,
    },
   
}));