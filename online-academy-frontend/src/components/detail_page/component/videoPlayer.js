import React, { useEffect, useState } from 'react';
import { Player, ControlBar, ReplayControl, ForwardControl, BigPlayButton } from 'video-react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Refreshtoken from '../../../refreshToken';


export default function PlayerControl(props) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("auth")))
    const [courseId,setCourseId] = useState(props.courseId)
    useEffect(()=>{
        setCourseId(props.courseId)
    },[props])
    const postProgress = async (currentTime)=>{
        const body = {
            contentId: props.contentId,
            courseId: courseId,
            currentTime: currentTime,
        }
        console.log(body)
        await Refreshtoken()
        await axios.post("http://localhost:3001/api/register-courses/progress",body,{
            headers: {
                'x-access-token': user.accessToken
            },
        }).then(res => {
            
        }).catch(error => console.log(error));
    }
    const componentRef = React.useRef();
    const handleKeyDown = (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // // Chrome requires returnValue to be set.
        var dialogText = 'Rời khỏi trang';
        event.returnValue = dialogText;
        if (componentRef.current) {
            const { player } = componentRef.current.getState();
            postProgress(parseInt(player.currentTime))
            console.log(player.currentTime); // thời điểm hiện tại của video
        }
    }

      useEffect(() => {
          console.log({id:props.courseId})
        const getTime = async ()=>{
            await window.addEventListener('beforeunload', handleKeyDown);
        }

        getTime();

        // cleanup this component
        return () => {
            window.removeEventListener('beforeunload', handleKeyDown);
        };
    }, []);
    return (
        <div>
            <Player
                ref={node => componentRef.current = node}
                src={props.src}
                startTime={props.startTime || '0'} //setup thời điểm cũ của video nếu có
            >

                <BigPlayButton position="center" />
                <ControlBar autoHide={false}>
                    <ReplayControl seconds={10} order={2.1} />
                    <ForwardControl seconds={10} order={2.2} />
                </ControlBar>
            </Player>
        </div>
    );
}