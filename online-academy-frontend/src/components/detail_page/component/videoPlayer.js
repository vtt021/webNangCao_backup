import React, { useState } from 'react';
import { Player } from 'video-react';
import defaultPoster from '../../common/images/potato.jpg'
export default function VideoPlayer(props) {
    // https://video-react.js.org/components/player/
    // Trang chủ package, có thể lên tham khảo để xử lý ( tua video, dừng, phát, đi đến s nào đó trên đó có demo hết)
    const [playerSource, setPlayerSource] = useState('https://media.w3.org/2010/05/sintel/trailer_hd.mp4');
    return (
        <div>
            <Player
                playsInline
                poster={defaultPoster}
                src={playerSource}
            />
        </div>
    );
}