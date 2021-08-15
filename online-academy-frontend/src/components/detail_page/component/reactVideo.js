import ReactPlayer from 'react-player'
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Refreshtoken from '../../../refreshToken';


export default function ReactVideo(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    const [courseId, setCourseId] = useState(props.courseId)
    const [playerControl, setplayerControl] = useState()
    useEffect(() => {
        setCourseId(props.courseId)
    }, [props])
    const postProgress = async (currentTime) => {
        const body = {
            contentId: props.contentId,
            currentTime: currentTime,
        }
        console.log(body)
        await Refreshtoken()
        await axios.post("http://localhost:3001/api/register-courses/progress", body, {
            headers: {
                'x-access-token': await Refreshtoken()
            },
        }).then(res => {

        }).catch(error => console.log(error));
    }
    const componentRef = React.useRef();
    useEffect(()=>{console.log(props.startTime)},[])
    const handleCloseTab = (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // // Chrome requires returnValue to be set.
        var dialogText = 'Rời khỏi trang';
        event.returnValue = dialogText;
        if (componentRef.current) {
            componentRef.current.playing= false;
            postProgress(parseInt(componentRef.current.getCurrentTime()))
            console.log(componentRef.current.getCurrentTime()); // thời điểm hiện tại của video
        }
    }
    useEffect(() => {
        console.log({ id: props.courseId })
        const getTime = async () => {
            await window.addEventListener('beforeunload', handleCloseTab);
        }
        getTime();
        // cleanup this component
        return () => {
            window.removeEventListener('beforeunload', handleCloseTab);
        };
    }, []);
    useEffect(() => {
        if (componentRef.current)
            if(props.startTime&&props.startTime<componentRef.current.getDuration()){
                componentRef.current.seekTo(props.startTime)
            }
    }, [componentRef.current,props.startTime]);
    return (
        <div>
            <ReactPlayer ref={node => componentRef.current = node}
                url={props.src}
                playing ={false}
                muted={true}
                controls={true}
                width='100%'
                height='100%'
                onPause={()=> console.log('pause rồi nè')}
            />
        </div>
    );
}