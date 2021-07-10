import React,{useState,useEffect} from 'react';
import axios from 'axios'
import Carousel from 'react-material-ui-carousel'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CourseCard from '../courseCard/courseCard.js'
export default function HomeCarousel(props) {
    const classes = useStyles();
    const [items,setItems] = useState([{}])
    const [teachers,setTeachers] = useState([{}])

    useEffect(() => {

        axios.get("http://localhost:3001/api/users/teacher").then(res => {
            const listTeacher = res.data;
            setTeachers(listTeacher);
            console.log(listTeacher)
        }).catch(error => console.log(error));


        axios.get("http://localhost:3001/api/courses/hot").then(res => {
            console.log(teachers)
            const listCourse = res.data;
            listCourse.forEach((item)=>{
                teachers.forEach(element => {
                    if(element.id===item.teacherId ){
                        item.teacherId = element.username
                    }
                });
            })
            setItems(listCourse);
        }).catch(error => console.log(error));
    }, []);

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