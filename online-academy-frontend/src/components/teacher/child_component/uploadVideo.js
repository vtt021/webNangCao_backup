import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AlertDialog from '../common/alert';
import VideoContent from './videoContent';
import { Link } from '@material-ui/core';
import StepButton from '@material-ui/core/StepButton';

import axios from 'axios';
import Refreshtoken from '../../../refreshToken';
import ConfirmDialog from '../common/confirmDialog';
import HeaderTeacher from './headerTeacher';

export default function UploadVideo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const courseId = props.match.params.id

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    
    const [courseData, setCourseData] = useState([]);

    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState(['Chương 1', 'Chương 2']); // Tên các chương đã có sẵn, gọi từ Database
    const [completed, setCompleted] = React.useState([1, 0]); // Kiểm tra có video cũ chưa

    const [oldVideo, setOldVideo] = useState('');
    const [videoFile, setVideoFile] = useState(); // input của video để lưu
    const [content, setContent] = useState(); // Thông tin 1 video
    const [isPreview, setIsPreview] = useState(false); // input checkbox 

    const [fileName, setFileName] = useState("");

    const [title, setTitle] = useState("")

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("auth")))
    }, [localStorage.getItem("auth")])

    const defaultData = {
        "video": "",
        "isPreview": "false",
        "_id": "",
        "courseId": "",
        "content": ""
    }

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }

    const handleSave = () => {
        //Lưu bài giảng đang nhập (gọi trong hàm onSubmit)
        if (activeStep > 0) {
            setCompleted(array => [...array.slice(0, activeStep + 1),
                1,
            ...array.slice(activeStep + 2)])

        }
        else {
            setCompleted(array => [1, ...array])
        }
    };

    useEffect(() => {
        //Nếu được thì reset form ở đây sẽ logic hơn :v
        setContent(courseData[activeStep] || defaultData)
        setTitle(courseData[activeStep] != null ? courseData[activeStep].content : defaultData.content)
        setOldVideo(courseData[activeStep] != null ? courseData[activeStep].video : defaultData.video)
        setIsPreview(courseData[activeStep] != null ? courseData[activeStep].isPreview.localeCompare("true") === 0 : false)
        setVideoFile(null)

    }, [activeStep]);

    useEffect(() => {
        const initDetailData = async () => {
            // await axios.get('http://localhost:3001/api/course-contents/course?courseId=60f1a3d20b04b858a41f1e13')
            await axios.get('http://localhost:3001/api/course-contents/course?courseId=' + courseId)
            .then(res => {
                let data = res.data;
                console.log(data);

                if (data.length === 0) {
                    setSteps(['Chương 1']);
                    setCompleted([0]);
                    setContent(defaultData)
                }
                else {
                    let chapters = data.map((d, i) => 'Chương ' + (i + 1));
                    setSteps(chapters);

                    let completeStatus = data.map((d, i) => d.video != null ? 1 : 0);
                    setCompleted(completeStatus)
                    setContent(res.data[0])
                    setTitle(res.data[0].content)
                    setIsPreview(res.data[0].isPreview.localeCompare("true") === 0)
                }
                setCourseData(res.data)
            }).catch(e => {
                console.log(e)
            })
        }


        const init = async() => {
            await initDetailData()
        }

        init();
    }, [])

    const handleNext = () => {
        //chuyển đến bài giảng tiếp theo or tạo thêm bài giảng mới
        if (activeStep === steps.length - 1) {
            setSteps(prevArray => [...prevArray, 'Chương ' + (steps.length + 1)]);
            setCompleted(prevArray => [...prevArray, 0])
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
    };

    const setupUploadVideo = async (ret) => {
        console.log("ret", ret);
        
        console.log("videoFile", videoFile);
        if (videoFile != null) {
            let formData = new FormData();
            // console.log(videoFile.fileName)
            let a = dataURLtoFile(videoFile[0], fileName);

            console.log("a", a)
            console.log("fileName", fileName)
            // console.log(selectedFile[0]);
            // console.log(oldVideo);
            formData.append("file", a, fileName)
            formData.append("contentId", ret);


            // console.log(selectedFile)

            let result2 = await axios.post('http://localhost:3001/api/course-contents/video', formData, {
                headers: {
                    'x-access-token': user.accessToken,
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
                }
            }).then(res => {
                console.log("Upload success!")
                return true;
            }).catch(e => {
                console.log(e)
                return false;
            })
        }
    }

    const setupUploadChapter = async () => {
        let ret = await axios.post('http://localhost:3001/api/course-contents', {
            courseId: courseId,
            content: title,
            isPreview: isPreview
        }, {
            headers: {
                'x-access-token': user.accessToken
            }
        }).then(res => {
            console.log("Success!")
            return res.data;
        }).catch(e => {
            console.log(e)
            return null;
        })

        return ret;
    }

    const setupUpdateChapter = async () => {
        let ret = await axios.put('http://localhost:3001/api/course-contents', {
            contentId: courseData[activeStep]['_id'],
            contentData: {
                isPreview: isPreview,
                content: title
            }
        }, {
            headers: {
                'x-access-token': user.accessToken
            }
        }).then(res => {
            console.log("Success!")
            return res.data;
        }).catch(e => {
            console.log(e)
            return null;
        })

        return ret;
    }



    const onSubmit = async data => {
        //Còn không thì cứ reset khi lưu 
        // handleSave();
        console.log(activeStep)
        // console.log(data)
        console.log(videoFile)
        console.log(courseData[activeStep])
        console.log(courseId);

        await Refreshtoken();

        if (courseData[activeStep] == null) {
            //Call API thêm chương
            console.log("Add chapter")
            let a = await setupUploadChapter()
            console.log(a);
            let b = await setupUploadVideo(a.contentId);

        }
        else {
            //Call API cập nhật chương
            let t = await setupUpdateChapter();

            await setupUploadVideo(courseData[activeStep]['_id'])
        }


        //console.log(videoFile[activeStep])
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleConfirm = () => {
        handleRemove()
        handleCloseConfirm()
    };
    
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleRemove = () => {
        //DONE: Gọi 1 cái popup xác nhận xóa chương
        if (steps.length > 1) {
            let k = activeStep;
            let newStep = [];
            for(let i = 1; i <= steps.length - 1; i++) {
                newStep.push('Chương ' + i)
            }
            if (k === 0) {
                setActiveStep(0);
                setContent(courseData[1]);
                setTitle(courseData[1].content)
                setOldVideo(courseData[1].video)
                setIsPreview(courseData[1].isPreview.localeCompare("true") === 0)
                setVideoFile(null);
                setSteps(newStep);
            }
            else {
                setActiveStep(activeStep - 1);
                setSteps(newStep);
            }

            setCompleted(courseData.filter((value, i) => i !== k));
            setCourseData(courseData.filter((value, i) => i !== k));
        }
        else {
            console.log(steps.length);
            setCourseData([defaultData])
            setContent(defaultData)
            setTitle("Chương 1")
            setOldVideo(null)
            setIsPreview(false)
            setVideoFile(null)
            setCompleted([0])
        }
    };
    const handleStep = (step) => () => {
        setActiveStep(step);
        // setTitle(courseData[step].content)
    };
    return (
        <div className={classes.root}>
            <AlertDialog open={open} handleClose={handleClose} value='Không thể xóa' />
            <ConfirmDialog open={openConfirm} handleClose={handleCloseConfirm} handleConfirm={handleConfirm} value='Bạn muốn xóa chương này' />
            <HeaderTeacher/>
            <Grid container spacing={2} alignItems='flex-start' justify='center'>
                <Grid container item xs={12} justify='center' spacing={2}>
                    <Grid item>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                            size='large'
                        >
                            Trước
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button variant="contained" color="primary" onClick={handleNext} size='large' disabled={activeStep === courseData.length || (courseData.length === 1 && completed[0] === 0)}>
                            {activeStep === steps.length - 1 ? 'Thêm' : 'Sau'}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item xs={12} justify='center' spacing={2}>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleClickOpenConfirm} size='large'>
                            Xóa
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            <Stepper activeStep={activeStep} alternativeLabel nonLinear >
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton onClick={handleStep(index)} completed={completed[index]}>
                            {'Chương ' + (index +1)}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    {
                        <Typography  variant='h5' style={{ paddingBottom: '1%'}}>
                            {steps[activeStep]}
                        </Typography>
                    }
                    <VideoContent id={activeStep} completed={completed[activeStep]}
                        onSubmit={onSubmit} setSelectedFile={setVideoFile} setFileName={setFileName}
                        content={content} isPreview={isPreview} setIsPreview={setIsPreview} title={title} setTitle={setTitle} 
                        oldVideo={oldVideo}
                    />
                </div>
            </div>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
        background: '#EFE3D0'
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));