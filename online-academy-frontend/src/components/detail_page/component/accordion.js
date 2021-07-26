import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Link } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PlayerControl from './videoClass';

export default function ControlledAccordions(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid container className={classes.root} >
            <Grid item xs={12}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>Chương 1</Typography>
                        <Typography className={classes.secondaryHeading}>Nội dung ( props.content)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container className={classes.root} >
                            <Grid item xs={12}>
                                <Link align='left'
                                    rel="noopener noreferrer" href="http://localhost:3001/api/files/send?fileName=1_1.mp4" target="_blank"
                                >
                                    Xem bài giảng
                                </Link>
                            </Grid>
                            <Grid item xs={12} className={classes.videoContainer}>
                                <PlayerControl src='http://localhost:3001/api/files/send?fileName=1_1.mp4' />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

            </Grid>

            <Grid item xs={12}>
                <Accordion disabled expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography className={classes.heading}>Chương 2</Typography>
                        <Typography className={classes.secondaryHeading}>
                            Nội dung chương 2
                        </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid container className={classes.root} >
                            <Grid container className={classes.root} >
                                <Grid item xs={12}>
                                    <Link align='left'
                                        rel="noopener noreferrer" href="http://localhost:3001/api/files/send?fileName=1_1.mp4" target="_blank"
                                    >
                                        Xem bài giảng
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

            </Grid>
        </Grid>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        alignItems: 'flex-start'

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    describeLong: {

    },
    videoContainer: {
        marginTop: 20
    }
}));