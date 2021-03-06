import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Link } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import PlayerControl from './videoPlayer';
export default function ControlledAccordions(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [courseContent, setCourseContent] = useState([]);
    const getCourseContent=async ()=>{
        await axios.get(process.env.REACT_APP_API_MAIN + "/course-contents/course?courseId=" + props.courseId).then(res => {
            setCourseContent(res.data)
            console.log(props.courseId)
        }).catch(error => console.log(error));
    }
    useEffect(() => {
        const init=async()=>{
            await getCourseContent()
        }
        init()
    }, []);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Grid container className={classes.root} >
            {courseContent.map((content, index) => {
                if (props.isBought === true || content.isPreview === 'true') {
                    return (
                        <Grid item xs={12}>
                            <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading}>Ch????ng {index + 1}</Typography>
                                    <Typography className={classes.secondaryHeading}>{content.content}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container className={classes.root} >
                                        <Grid item xs={12}>
                                            <Link align='left'
                                                rel="noopener noreferrer" href={'/video/' + content._id}
                                            >
                                                Xem b??i gi???ng
                                            </Link>
                                        </Grid>
                                        {/* <Grid item xs={12} className={classes.videoContainer}>
                                            <PlayerControl src={process.env.REACT_APP_API_MAIN + '/files/send?fileName=' + content.video} />
                                        </Grid> */}
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )
                }
                else 
                {
                    return (
                        <Grid item xs={12}>
                            <Accordion disabled={true} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography className={classes.heading}>Ch????ng {index + 1}</Typography>
                                    <Typography className={classes.secondaryHeading}>{content.content}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {/*Kh??ng c?? g?? ????? xem */}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )
                }

            })}
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