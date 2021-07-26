import React, { Component } from 'react';
import { PrismCode } from 'react-prism';
import { Player, ControlBar, ReplayControl, ForwardControl, BigPlayButton } from 'video-react';
import { Button } from '@material-ui/core';


export default class PlayerControl extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            source: props.src ? props.src : 'http://localhost:3001/api/files/send?fileName=1_1.mp4',
            poster: props.poster
        };

    }
    componentDidMount() {
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }
    handleStateChange(state) {
        // copy player state to this component's state
        this.setState({
            player: state
        });
    }

    getCurrentTime() {
        return () => {
            const { player } = this.player.getState();
            console.log(player.currentTime);
        };
    }
    render() {

        return (
            <div>
                <Player
                    ref={player => {
                        this.player = player;
                    }}
                    startTime='50' //setup thời điểm cũ của video nếu có
                >
                    <source src={this.state.source} />
                    <BigPlayButton position="center" />
                    <ControlBar autoHide={false}>
                        <ReplayControl seconds={10} order={2.1} />
                        <ForwardControl seconds={10} order={2.2} />
                    </ControlBar>
                </Player>
                
                <div className="pb-3">
                    <Button onClick={this.getCurrentTime()} className="mr-3">
                        getCurrentTime
                    </Button>
                </div>


            </div>
        );
    }
}