import React, { useEffect, useState } from 'react';
import { Player, ControlBar, ReplayControl, ForwardControl, BigPlayButton } from 'video-react';
import { Button } from '@material-ui/core';


export default function PlayerControl(props) {

    const componentRef = React.useRef();
    const handleKeyDown = (event) => {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // // Chrome requires returnValue to be set.
        var dialogText = 'Rời khỏi trang';
        event.returnValue = dialogText;
        if (componentRef.current) {
            const { player } = componentRef.current.getState();
            console.log(player.currentTime); // thời điểm hiện tại của video
        }
    }
    useEffect(() => {
        window.addEventListener('beforeunload', handleKeyDown);

        // cleanup this component
        return () => {
            //window.removeEventListener('beforeunload', handleKeyDown);
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