import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Refreshtoken from '../../../refreshToken';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const handleDellteCourse= async (admin,id)=>{
    Refreshtoken()
    const data = {
        courseId: id
    }
    await axios.delete('http://localhost:3001/api/courses/admin',{
        headers: {
            'x-access-token': admin
        },
        data: data
    })
    .then(res => {
        window.location.reload()
    }).catch(e => {
        console.log(e);
    })
}
export default function Deleteaction(props) {
    const classes = useStyles();
    const [auth,setAuth] = useState(JSON.parse(localStorage.getItem("auth")))
    const [isDisabled,setIsDisabled] = useState(false);
    const [open, setOpen] = React.useState(props.isOpened);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
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
        <div>
        <IconButton disabled={isDisabled} aria-label="delete" className={classes.margin} onClick={() => { handleOpen() }}>
          <DeleteIcon fontSize="large"/>
        </IconButton>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{"Thông báo"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Nếu xóa khóa học này thì tất cả các lượt đăng ký sẽ bị hủy.
                Bạn có muốn xóa không?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>{handleDellteCourse(auth.accessToken,props.id) }} color="primary" autoFocus>
                Đồng ý
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                Hủy
            </Button>
        </DialogActions>
    </Dialog>
    </div>
    )
}
