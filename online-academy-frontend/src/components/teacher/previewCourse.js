import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Paper, Typography, List, ListItem, Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import HeaderTeacher from './child_component/headerTeacher';
import Footer from '../common/footer/footer';
import CourseInfo from '../detail_page/component/courseInfo';
import Accordions from '../detail_page/component/accordion';
import MultiCarousel from '../common/carousel/multiCarousel';
import FeedBack from '../detail_page/component/feedBack';
import Refreshtoken from '../../refreshToken';
import Rating from '@material-ui/lab/Rating';
import { TextField, Button } from '@material-ui/core';
import AlertDialog from '../admin/common/Alert';
import TeacherAccordions from './preview/decuong';
import TeacherCourseInfo from './preview/khoahoc';
export default function PreviewDetailPage(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [courseDetail, setCoursesDetail] = useState({});
    const [email, setEmail] = useState("");

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))

    const [ratingValue, setRatingValue] = React.useState(2);
    const [ratingContent, setRatingContent] = React.useState('Đánh giá của bạn');
    const handleChangeRatingContent = (event) => {
        setRatingContent(event.target.value);
    };
    const handleRating = async () => {
        Refreshtoken()
        const body = {
            courseId: id,
            rate: ratingValue,
            rateContent: ratingContent
        }
        await axios.post("http://localhost:3001/api/register-courses/rate",body,{
                headers: {
                    'x-access-token': await Refreshtoken()
                },
            }).then(res => {
                window.location.reload()

            })
                .catch(error => console.log(body));
    }




    const [feedbackStatus, setFeedbackStatus] = useState(0); //0 --> Phân hệ khách hoặc chưa mua, 1 --> User, chưa đánh giá, 2 --> User, đã đánh giá
    const [isBought, setIsBought] = useState(false);    //Khóa học đã được mua
    const [isFavorite, setIsFavorite] = useState(false); //Khóa học đã được user yêu thích
    const [openLike, setOpenLike] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openBuy, setOpenBuy] = useState(false);
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
            setOpenLike(true)
            return;
        }

        await axios.post('http://localhost:3001/api/users/favorite', {
            courseId: courseDetail._id
        }, {
            headers: {
                'x-access-token': await Refreshtoken()
            }
        }).then(res => {
            console.log(res.data);
            setIsFavorite(res.data.isFavorite)
        }).catch(e => {
            console.log(e);
        })
    }

    const handleBuyCourse = async () => {
        if(!user){
            setOpenBuy(true)
            return
        }
        await Refreshtoken();

        await axios.post("http://localhost:3001/api/register-courses", {
            courseId: id
        }, {
            headers: {
                'x-access-token': await Refreshtoken()
            }
        }).then(res => {
            setOpenSuccess(true)

            setIsBought(true);
        }).catch(e => {
            setOpenError(true)
        })
    }

    useEffect(() => {
        const setBoughtCourseAndFeedbackStatus = async () => {
            if (user != null) {
                await axios.get('http://localhost:3001/api/register-courses/detail?courseId=' + id, {
                    headers: {
                        'x-access-token': await Refreshtoken()
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
                        'x-access-token': await Refreshtoken()
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
            await axios.get("http://localhost:3001/api/register-courses/rate?courseId=" + id)
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
    const feedbackComponent = () => {
        if (feedbackStatus === 0) {
            return (
                <Typography variant='h5' style={{ paddingBottom: '2%', width: '100%' }}>
                    Bạn chưa đăng ký khóa học
                </Typography>
            )
        }
        else if (feedbackStatus === 1) {
            return (
                <List className={classes.list} style={{ width: '100%' }}>
                    <ListItem alignItems="flex-start">
                        <Grid container direction='column' >
                            <Paper className={classes.paper} >
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                    <Rating
                                        name="simple-controlled"
                                        value={ratingValue}
                                        onChange={(event, newValue) => {
                                            setRatingValue(newValue);
                                        }}

                                    />
                                </Box>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={4}
                                    style={{ width: '100%' }}
                                    value={ratingContent}
                                    defaultValue={ratingContent}
                                    onChange={handleChangeRatingContent}
                                    variant="outlined"
                                />
                            </Paper>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '2%' }}>
                                <Button variant="contained" color="primary" style={{ width: '20%', height: 50 }}
                                    onClick={handleRating}
                                >
                                    Gửi đánh giá
                                </Button>
                            </div>

                        </Grid>


                    </ListItem>
                </List>
            )

        }
        else if (feedbackStatus === 2) {
            return (
                <Typography variant='h5' style={{ paddingBottom: '2%', width: '100%' }}>
                    Bạn đã đánh giá khóa học này rồi
                </Typography>
            )
        }
    }
    const handleCarousel = () => {
        if (courseDetail._id != null && courseDetail.subCategoryId != null) {
            return (
                <div className={classes.root}>
                    <AlertDialog close={()=>{setOpenLike(false)}} isOpened={openLike} value={"Bạn phải có tài khoản mới thể thích khóa học này"}/>
                    <AlertDialog close={()=>{setOpenSuccess(false)}} isOpened={openSuccess} value={"Đăng ký khóa học thành công"}/>
                    <AlertDialog close={()=>{setOpenError(false)}} isOpened={openError} value={"Đăng ký khóa học không thành công"}/>
                    <AlertDialog close={()=>{setOpenBuy(false)}} isOpened={openBuy} value={"Bạn phải đăng nhập mới có thể mua khóa học này"}/>
                    <TeacherCourseInfo courseInfo={courseDetail} isBought={isBought} isFavorite={isFavorite}
                        handleChangeLove={handleChangeLove} handleBuyCourse={handleBuyCourse} />
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
                            <TeacherAccordions courseId={id} isBought={isBought} />
                            <Typography variant="h4" gutterBottom className={classes.underline} >
                                Đánh giá của bạn:
                            </Typography>
                            <div style={{ paddingBottom: '2%', width: '100%' }} />
                            {
                                feedbackComponent()
                            }
                            <br />
                            <Typography variant="h4" gutterBottom className={classes.underline}>
                                Đánh giá từ học viên:
                            </Typography>
                            <div style={{ paddingBottom: '2%', width: '100%' }} />
                            <List className={classes.list}>
                                {
                                    listFeedback.length > 0
                                        ?
                                        listFeedback.map((item, i) =>
                                            <ListItem alignItems="flex-start" className={classes.listItem}

                                            >
                                                <FeedBack rating={item.rating}
                                                    rateContent={item.rateContent}
                                                    username={item.username} />
                                            </ListItem>
                                        )
                                        : <Typography variant='h5' style={{ paddingBottom: '2%', width: '100%' }}>
                                            Khóa học chưa được đánh giá
                                        </Typography>

                                }
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
            <HeaderTeacher />
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
    paper: {
        width: '100%',
        padding: theme.spacing(2),
        background: '#FDF6F0'
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