import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Refreshtoken from '../../../refreshToken';
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
const handleDellteUser=async (admin,id)=>{
    Refreshtoken()
    const data = JSON.stringify({id:id})
    await axios.delete('http://localhost:3001/api/users/',{
        body:{
            "id":id
        },headers:{
            "x-access-token":admin
        },
    })
    .then(res => {
        alert("Delete user success")
        window.location.reload()
    })
}
export default function Deleteaction(props) {
    const classes = useStyles();
    const [auth,setAuth] = useState(JSON.parse(localStorage.getItem("auth")))
    useEffect(()=>{
        setAuth(JSON.parse(localStorage.getItem("auth")))
    },[localStorage.getItem("auth")])

    useEffect(() => {
        if (auth===null||auth.role != 2) 
        {
            window.location.replace("/")
        }
    }, [auth])
    return (
        <IconButton aria-label="delete" className={classes.margin} onClick={() => { handleDellteUser(auth.accessToken,props.id) }}>
          <DeleteIcon fontSize="large"/>
        </IconButton>
    )
}
