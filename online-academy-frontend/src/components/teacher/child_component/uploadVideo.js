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

import PlayerControl from '../../detail_page/component/videoPlayer';
import axios from 'axios';
export default function UploadVideo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const courseId = props.match.params.id

    const [courseData, setCourseData] = useState([]);

    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState(['Chương 1', 'Chương 2']); // Tên các chương đã có sẵn, gọi từ Database
    const [completed, setCompleted] = React.useState([1, 0]); // Kiểm tra có video cũ chưa

    const [oldVideo, setOldVideo] = useState('');
    const [videoFile, setVideoFile] = useState(); // input của video để lưu
    const [content, setContent] = useState(); // Thông tin 1 video
    const [isPreview, setIsPreview] = useState(false); // input checkbox 

    const [title, setTitle] = useState("")

    const defaultData = {
        "video": "",
        "isPreview": "false",
        "_id": "",
        "courseId": "",
        "content": ""
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
        console.log("abc")
        setContent(courseData[activeStep] || defaultData)
        setTitle(courseData[activeStep] != null ? courseData[activeStep].content : defaultData.content)
        setOldVideo(courseData[activeStep] != null ? courseData[activeStep].video : defaultData.video)
        console.log(courseData[activeStep] != null ? courseData[activeStep].isPreview : "đcm")
        setIsPreview(courseData[activeStep] != null ? courseData[activeStep].isPreview.localeCompare("true") === 0 : defaultData.isPreview)
        setVideoFile()

    }, [activeStep]);

    useEffect(() => {
        const initDetailData = async () => {
            await axios.get('http://localhost:3001/api/course-contents/course?courseId=60f1a3d20b04b858a41f1e13')
            // await axios.get('http://localhost:3001/api/course-contents/course?courseId=' + courseId)
            .then(res => {
                let data = res.data;
                console.log(data);

                if (data.length === 0) {
                    setSteps(['Chương 1']);
                    setCompleted([0]);
                    setContent(defaultData)
                }
                else {
                    let chapters = data.map((d, i) => 'Chapter ' + (i + 1));
                    setSteps(chapters);

                    let completeStatus = data.map((d, i) => d.video != null ? 1 : 0);
                    setCompleted(completeStatus)
                    setContent(res.data[0])
                    setTitle(res.data[0].content)
                    setIsPreview(res.data[0].isPreview.localeCompare("true") === 0)
                }
                // setContent()

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
    const onSubmit = async data => {
        //Còn không thì cứ reset khi lưu 
        handleSave();
        console.log(activeStep)
        console.log(data)
        console.log(videoFile)
        //console.log(videoFile[activeStep])
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleRemove = () => {

        if (    steps.length >1
            // activeStep === steps.length - 1
            ) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            setSteps(steps.filter((value, i) => i !== activeStep));
        }
        else {
            console.log('Không thể xóa')
            handleClickOpen()

        }
    };
    const handleStep = (step) => () => {
        setActiveStep(step);
        // setTitle(courseData[step].content)
    };
    return (
        <div className={classes.root}>
            <AlertDialog open={open} handleClose={handleClose} />
            <Grid container spacing={2} alignItems='flex-start' justify='center'>
                <Grid container item xs={12} justify='center' spacing={2}>
                    <Grid item>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                        >
                            Trước
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button variant="contained" color="primary" onClick={handleNext} size='large' disabled={activeStep === courseData.length}>
                            {activeStep === steps.length - 1 ? 'Thêm' : 'Sau'}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item xs={12} justify='center' spacing={2}>
                    <Grid item>
                        <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={handleRemove}>
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
                    {completed[activeStep] === 1 && (
                        <Link align='left'
                            rel="noopener noreferrer" target="_blank" variant='h4'
                            href={'http://localhost:3001/api/files/download?fileName=' + oldVideo}
                        >
                            Video hiện tại
                        </Link>
                    )
                    }
                    <VideoContent id={activeStep} completed={completed[activeStep]}
                        onSubmit={onSubmit} setSelectedFile={setVideoFile}
                        content={content} isPreview={isPreview} setIsPreview={setIsPreview} title={title} setTitle={setTitle} 
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