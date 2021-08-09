import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { Paper, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { Container, } from 'react-bootstrap'
import Grid from '@material-ui/core/Grid';
import { useForm } from "react-hook-form";
import Link from '@material-ui/core/Link';
import ImageUploadCard from '../child_component/uploadImage';
import UpdateContent from './updateContent';
import Footer from '../../common/footer/footer';
import HeaderTeacher from '../child_component/headerTeacher';

export default function UpdateCourse(props) {
    const classes = useStyles();

    const id = props.match.params.id
    const [selectedFile, setSelectedFile] = useState(null); //Nhớ set cái hình cũ ở đây luôn nha
    const [courseInfo, setCourseInfo] = useState(null); //gọi API để lấy thông tin cũ của khóa học
    const [courseImage, setCourseImage] = useState(null);
    const [thumbnailImage, setThumbnailImage] = useState(null);

    const [courseImageName, setCourseImageName] = useState(null);
    const [thumbnailImageName, setThumbnailImageName] = useState(null);

    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'Tất cả lĩnh vực' }])
    const [listSubCategory, setListSub] = useState([{ id: 1, categoryName: 'Tất cả lĩnh vực phụ' }])

    const initData = async () => {
        let info = await axios.get('http://localhost:3001/api/courses/id?id=' + id)
            .then(res => {
                let receiveData = res.data;
                console.log(res.data);
                setCourseInfo(receiveData);
                console.log("abc", courseInfo);
                return courseInfo;

            }).catch(e => {
                console.log(e);
            });
        console.log(info);
        return info;
    }

    const setupSubcate = async () => {
        let subData = await axios.get("http://localhost:3001/api/sub-categories/").then(res => {
            setListSub(res.data)
            return res.data;
        }).catch(error => {
            console.log(error);
            return null;
        })

        return subData;
    }

    const setupCategory = async () => {
        await axios.get("http://localhost:3001/api/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }

    const loadImage = async (filename) => {
        let data = axios.get(`http://localhost:3001/api/files/send?fileName=${filename}`)
            .then(res => {
                let data = res.data;
                let buff = btoa(unescape(encodeURIComponent(data)))

                console.log(buff);
                setCourseImage(buff);
            })
    }

    useEffect(() => {
        // const init = async () => {

        //     if (props.courseInfo != null){
        //         await loadImage(props.courseInfo.imageCourse);
                
        //     }

        // }
        // init();

    }, [props.courseInfo])


    useEffect(() => {
        const init = async () => {
            await setupCategory();
            await setupSubcate();
            let info = await initData();
            // console.log("here", convertImgToBase64("http://localhost:3001/api/files/send?fileName=course1.jpg", (dataUrl) => {
            //     console.log("DataURL", dataUrl);
            //     return dataUrl;
            // }));
            // console.log("info.imageCourse", info);


        }

        init();
    }, [])

    const onSubmit = data => {
        console.log(data) //Dữ liệu khóa học người dùng nhập vào
        console.log(courseImage)
        //Hiển thị hình 
        //------------
        // < img  
        // src = { selectedFile }
        //     />
        //------------
    }

    return (
        <div fluid>

            <HeaderTeacher />
            <Grid container spacing={3} className={classes.container}>
                <Grid item xs={12}>
                    <h2>
                        Cập nhật thông tin khóa học
                    </h2>
                </Grid>

                <Grid item xs={2}>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h5' align='left'>
                        Ảnh bìa:
                    </Typography>
                    <ImageUploadCard id='1' selectedFile={courseImage} setSelectedFile={setCourseImage} setFileName={setCourseImageName} />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h5' align='left'>
                        Ảnh minh họa:
                    </Typography>
                    <ImageUploadCard id='2' selectedFile={thumbnailImage} setSelectedFile={setThumbnailImage} setFileName={setThumbnailImageName} />
                </Grid>
                <Grid item xs={2}>
                </Grid>

                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <UpdateContent onSubmit={onSubmit} courseInfo={courseInfo}
                        listCategories={listCategories} listSubCategory={listSubCategory}
                        setListCategories={setListCategories} setListSub={setListSub} />
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}
const useStyles = makeStyles((theme) => ({
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
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}