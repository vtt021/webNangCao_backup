import IconButton from '@material-ui/core/IconButton';
import Lock from "@material-ui/icons/Lock"
import LockOpen from "@material-ui/icons/LockOpen"
import React, { useState } from 'react'

export default function Lockaction(props) {
    const [unLocked,setUnlocked] = useState(props.isUnlocked)

    return (
        <IconButton>
            {unLocked?<LockOpen/>:<Lock/>}
        </IconButton>
    )
}
