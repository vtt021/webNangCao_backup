import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import Header from '../common/header/header';
import CourseInfo from './component/courseInfo';
import Footer from '../common/footer/footer';
import Accordions from './component/accordion';
import MultiCarousel from '../common/carousel/multiCarousel';
import FeedBack from './component/feedBack';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import Refreshtoken from '../../refreshToken';

export default function DetailPage(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [courseDetail, setCoursesDetail] = useState({});
    const [email, setEmail] = useState("");

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))


    /**
     * TODO: 
     * - Setup 1 chỗ cho phép user đánh giá (nếu user chưa đánh giá trước đó), 
     *  nếu đã đánh giá rồi thì nên hiện 1 dòng bạn đã đánh giá khóa học này (xem biến feedbackStatus)
     * - Render danh sách user đã đánh giá (có thể phân trang hoặc không)
     * - Làm giùm em 3 cái popup trong phần này (Chú có thể Ctrl + F xong gõ popup)
     * - Phần UI học phí trong này đang lỗi giá tiền, chú check lại giúp em
     * 
     *  */ 
  
    
    
    const [feedbackStatus, setFeedbackStatus] = useState(0); //0 --> Phân hệ khách hoặc chưa mua, 1 --> User, chưa đánh giá, 2 --> User, đã đánh giá
    const [isBought, setIsBought] = useState(false);    //Khóa học đã được mua
    const [isFavorite, setIsFavorite] = useState(false); //Khóa học đã được user yêu thích

    const [listFeedback, setListFeedback] = useState([]);   //Danh sách các feedback

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    const getTeacherEmail = async () => {
        await axios.get("http://localhost:3001/api/users/id?id=" + courseDetail.teacherId).then(res => {
            setEmail(res.data.email)
            console.log(res.data.email)
        }).catch(error => console.log(error));
    }
    const getCourseDetail = async () => {
        await axios.get("http://localhost:3001/api/courses/id?id=" + id).then(res => {
            setCoursesDetail(res.data)
        }).catch(error => console.log(error))
    }

    const handleChangeLove = async (event) => {
        await Refreshtoken();

        console.log(event.target.checked); //True: Yêu thích - False: Không
        console.log(user)
        if (user == null) {
            //TODO: Popup "Bạn cần có tài khoản để thích khóa học này"
            return;
        }

        await axios.post('http://localhost:3001/api/users/favorite', {
            courseId: courseDetail._id
        }, {
            headers: {
                'x-access-token': user.accessToken
            }
        }).then(res => {
            console.log(res.data);
        }).catch(e => {
            console.log(e);
        })
    }

    const handleBuyCourse = async () => {
        await Refreshtoken();

        await axios.post("http://localhost:3001/api/register-courses", {
            courseId: id
        }, {
            headers: {
                'x-access-token': user.accessToken
            }
        }).then(res => {
            //TODO: Popup đăng ký khóa học thành công
            
            setIsBought(true);
        }).catch(e => {
            //TODO: Popup lỗi
        })
    }

    useEffect(() => {
        const setBoughtCourseAndFeedbackStatus = async () => {
            if (user != null) {
                await axios.get('http://localhost:3001/api/register-courses/detail?courseId=' + id, {
                    headers: {
                        'x-access-token': user.accessToken
                    }
                }).then(res => {
                    console.log(res.data);
                    let isRegistered = res.data.isRegistered;
                    if (isRegistered === true) {
                        setIsBought(true);
                        if (res.data.registration.rating === 0) {
                            setFeedbackStatus(1);
                        }
                        else {
                            setFeedbackStatus(2);
                        }
                    }
                    else {
                        setIsBought(false);
                        setFeedbackStatus(0);
                    }
                })
            }
            else {
                setIsBought(false)
                setFeedbackStatus(0);
            }
        }

        const setFavorite = async () => {
            if (user != null) {
                await axios.get('http://localhost:3001/api/users/favorite-course?courseId=' + id, {
                    headers: {
                        'x-access-token': user.accessToken
                    }
                }).then(res => {
                    console.log(res.data)
                    setIsFavorite(res.data.isFavorite)
                })
            }
            else {
                setIsFavorite(false)
            }
        }

        const setFeedbackList = async () => {
            await axios.get("http://localhost:3001/api/register-courses/rate?courseId="+id)
            .then(res => {
                console.log(res.data);
                setListFeedback(res.data);
            })
            .catch(e => {
                console.log(e);
            })
        }

      

        const init = async () => {
            await getCourseDetail()
            await setBoughtCourseAndFeedbackStatus();
            await setFavorite();
            await setFeedbackList();
        }
        init()

    }, []);


    useEffect(() => {
        const init = async () => {
            await getTeacherEmail()
        }
        init()
    }, [courseDetail]);

    const handleCarousel = () => {
        if (courseDetail._id != null && courseDetail.subCategoryId != null) {
            return (
                <div className={classes.root}>
                    <CourseInfo courseInfo={courseDetail} isBought={isBought} isFavorite={isFavorite} 
                    handleChangeLove={handleChangeLove} handleBuyCourse={handleBuyCourse}/>
                    <Grid container spacing={3} className={classes.container}>
                        <Grid item xs={9} container className={classes.grid1} >
                            <Paper className={classes.leftPaper} >
                                <div dangerouslySetInnerHTML={{
                                    __html: courseDetail.detailLong
                                }} variant="h6" align='left'>
                                </div>
                            </Paper>
                            <Typography variant="h4" gutterBottom className={classes.underline}>
                                Đề cương khóa học
                            </Typography>
                            <Accordions courseId={id} isBought={isBought}/>
                            <Typography variant="h4" gutterBottom className={classes.underline}>
                                Đánh giá từ học viên:
                            </Typography>
                            <List className={classes.list}>
                                <ListItem alignItems="flex-start" className={classes.listItem}>
                                    <FeedBack />
                                </ListItem>
                                <ListItem alignItems="flex-start" className={classes.listItem}>
                                    <FeedBack />
                                </ListItem>
                            </List>
                        </Grid>

                        <Grid item xs={3} container className={classes.grid2}>
                            <Paper className={classes.rightPaper}>
                                <Typography variant="h6" gutterBottom align='left'>
                                    Thông tin giảng viên
                                </Typography>
                                <Typography gutterBottom align='left'>
                                    Giảng viên: {courseDetail.teacherName}
                                </Typography>
                                <Typography gutterBottom align='left'>
                                    Địa chỉ liên hệ: {email}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} container >
                            <Typography variant="h4" gutterBottom className={classes.underline}>
                                Khóa học cùng lĩnh vực
                            </Typography>
                            <MultiCarousel categoryId={`courses/related?limit=5&courseId=${courseDetail._id}&subCategoryId=${courseDetail.subCategoryId}`} />
                        </Grid>
                    </Grid>
                </div>
            )
        }
        else {
            return;
        }
    }

    return (
        <div fluid>
            <Header />
            {
                handleCarousel()
            }
            <Footer />
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '3%',
        paddingRight: '3%'
    },
    container: {
        flexGrow: 1,
        marginTop: 50,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        justify: 'flex-start',

    },
    leftPaper: {
        padding: theme.spacing(2),
        background: '#E6DDC6',
        width: '100%',
        marginBottom: '5%',
    },
    rightPaper: {
        padding: theme.spacing(2),
        background: '#FEF7DC',
        width: '100%',
        marginBottom: '5%',
    },
    underline: {
        borderBottom: '2px solid',
        paddingTop: '5%'

    },
    grid1: {
    },
    grid2: {

    },
    grid3: {
        marginTop: '20%'
    },
    list: {
        width: '100%'
    },
    listItem: {
        background: '#E6DDC6'
    }

}));