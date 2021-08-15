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

const handleDellteUser= async (admin,id)=>{
    Refreshtoken()
    const data = {
        id: id
    }
    await axios.delete('http://localhost:3001/api/users/',{
        headers: {
            'x-access-token': await Refreshtoken()
        },
        data: data
    })
    .then(res => {
        alert("Xóa tài khoản thành công")
        window.location.reload()
    }).catch(e => {
        console.log(e);
    })
}
export default function Deleteaction(props) {
    const classes = useStyles();
    const [auth,setAuth] = useState(JSON.parse(localStorage.getItem("auth")))
    const [isDisabled,setIsDisabled] = useState(false);
    useEffect(()=>{
        setAuth(JSON.parse(localStorage.getItem("auth")))
    },[localStorage.getItem("auth")])

    useEffect(()=>{
        console.log(auth.id === props.id)
        if(props.isDeleted){
            setIsDisabled(true)
        }else if(auth.id === props.id){
            setIsDisabled(true)
        }else{
            setIsDisabled(false)
        }
        
    },[auth,props])

    useEffect(() => {
        if (auth===null||auth.role != 2) 
        {
            window.location.replace("/")
        }
    }, [auth])
    return (
        <IconButton disabled={isDisabled} aria-label="delete" className={classes.margin} onClick={() => { handleDellteUser(auth.accessToken,props.id) }}>
          <DeleteIcon fontSize="large"/>
        </IconButton>
    )
}
