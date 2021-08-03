import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const abc = [
    <Button>
        abac
    </Button>,
    <Button>
        123
    </Button>
];
export default function UploadVideo() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setsteps] = useState(['Chương 1', 'Chương 2']);
    const [list, setList] = useState([abc, 'Chương 2']);

    
    function getStepContent(stepIndex) {
        return list[stepIndex];
    }

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            setsteps(prevArray => [...prevArray, 'Chương ' + (steps.length + 1)]);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleRemove = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setsteps(steps.filter((value, i) => i !== activeStep));
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={3} alignItems='center' justify='center'>
                <Grid item>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                    >
                        Quay lại
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Thêm' : 'Chương kế'}
                    </Button>
                </Grid>
                <Grid item>
                    <Button disabled={activeStep === 0} variant="contained" color="primary" onClick={handleRemove}>
                        Xóa
                    </Button>
                </Grid>
            </Grid>

            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    {getStepContent(activeStep)}
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
        background:'#EFE3D0'
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));