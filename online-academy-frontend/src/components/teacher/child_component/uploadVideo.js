import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AlertDialog from '../common/alert';
import VideoContent from './videoContent';

export default function UploadVideo() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const [steps, setsteps] = useState(['Chương 1', 'Chương 2']);
    const [completed, setCompleted] = React.useState([0, 0]);

    const [videoFile, setVideoFile] = useState();
    const [content, setContent] = useState();
    const [isPreview, setIsPreview] = useState(false);

    const handleSave = () => {
        if (activeStep > 0) {
            setCompleted(array => [...array.slice(0, activeStep + 1),
                1,
            ...array.slice(activeStep + 2)])
        }
        else {
            setCompleted(array => [1, ...array])
        }

    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            setsteps(prevArray => [...prevArray, 'Chương ' + (steps.length + 1)]);
            setCompleted(prevArray => [...prevArray, 0])
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    const onSubmit = async data => {
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

        if (activeStep === steps.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
            setsteps(steps.filter((value, i) => i !== activeStep));
        }
        else {
            console.log('khong phai chuong cuoi')
            handleClickOpen()

        }
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
                        <Button variant="contained" color="primary" onClick={handleNext} size='large'>
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
                <Grid container item xs={12} justify='center' spacing={2}>
                    <Grid item>
                        {
                            completed[activeStep] === 1 && (
                                <Typography variant='h5'>
                                    Đã lưu
                                </Typography>
                            )
                        }
                    </Grid>
                </Grid>

            </Grid>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    {/* {getStepContent(activeStep)} */}
                    <VideoContent id={activeStep} completed={completed[activeStep]}
                        onSubmit={onSubmit} setSelectedFile={setVideoFile}
                        content={content} isPreview={isPreview}
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