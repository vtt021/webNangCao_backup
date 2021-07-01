import ShowMore from 'react-show-more-button/dist/module';
import React from 'react';
import './showMoreButton.css';

export function ShowMoreText(props) {
    return (
        <ShowMore maxHeight={100}
                    classNameButton='buttonShowMoreLess'  >
            <p className='textInMore'>
            {props.content}
             </p> 
            </ShowMore>
        );
}