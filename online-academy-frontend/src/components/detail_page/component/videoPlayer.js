import React, { useState } from 'react';
import { Player, ControlBar, ReplayControl, ForwardControl, BigPlayButton } from 'video-react';
import { Button } from '@material-ui/core';


export default function PlayerControl(props) {

    const componentRef = React.useRef();

    const getCurrentTime = () => {
        return () => {
            const { player } = componentRef.current.getState();
            console.log(player.currentTime);
        };
    }

    return (
        <div>
            <Player
                ref={node => componentRef.current = node}
                startTime={'0'} //setup thời điểm cũ của video nếu có
            >
                <source src={props.src} />
                <BigPlayButton position="center" />
                <ControlBar autoHide={false}>
                    <ReplayControl seconds={10} order={2.1} />
                    <ForwardControl seconds={10} order={2.2} />
                </ControlBar>
            </Player>

            <div className="pb-3">
                <Button onClick={getCurrentTime()} className="mr-3">
                    getCurrentTime
                </Button>
            </div>


        </div>
    );
}