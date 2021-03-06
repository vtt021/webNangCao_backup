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

const handleDellteCourse= async (id)=>{
    const data = {
        courseId: id
    }
    await axios.delete(process.env.REACT_APP_API_MAIN + '/courses/admin',{
        headers: {
            'x-access-token': await Refreshtoken()
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
        <DialogTitle id="alert-dialog-title">{"Th??ng b??o"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                N???u x??a kh??a h???c n??y th?? t???t c??? c??c l?????t ????ng k?? s??? b??? h???y.
                B???n c?? mu???n x??a kh??ng?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>{handleDellteCourse(props.id) }} color="primary" autoFocus>
                ?????ng ??
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
                H???y
            </Button>
        </DialogActions>
    </Dialog>
    </div>
    )
}
