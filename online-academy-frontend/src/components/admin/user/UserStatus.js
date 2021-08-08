import { Typography } from '@material-ui/core';
import React from 'react';

export default function Tag(props) {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div
        style={{
          backgroundColor: props.backGroundColor,
          width: '70%',
          padding: '2% 4% 2% 4%',
          borderRadius: '20px',
        }}
      >
        <Typography
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: props.textColor,
          }}
        >
          {props.content}
        </Typography>
      </div>
    </div>
  );
}
