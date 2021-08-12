import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Refreshtoken from '../../../refreshToken';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AlertDialog from '../common/Alert';
export default function CategoryAction(props) {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")))
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [newName, setNewName] = useState("")
    const [isDisabled,setIsDisabled] = useState(false);
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
        console.log(props.isDeleted)
        if(props.isDeleted){
            setIsDisabled(true)
        }else{
            setIsDisabled(false)
        }
        
    },[props])
    const handleRenameAction = async () => {
        Refreshtoken()
        console.log(auth)
        if (newName != "") {
            const data = {
                id: props.id,
                subCategoryName: newName
            }
            console.log(data)
            await axios.put('http://localhost:3001/api/sub-categories/', data, {
                headers: {
                    'x-access-token': auth.accessToken
                },

            })
                .then(res => {
                    window.location.reload()
                }).catch(e => {
                    console.log(e);
                })
        }
    }

    const closeDialog=()=>{
        setOpenDelete(false)
    }

    const handleDeleteAction = async () => {
        Refreshtoken()
        const data = {
            id: props.id
        }
        console.log(data)
        await axios.delete('http://localhost:3001/api/sub-categories/', {
            headers: {
                'x-access-token': auth.accessToken
            },
            data: data
        })
            .then(res => {
                alert("Xóa lĩnh vực thành công")
                window.location.reload()
            }).catch(e => {
                setOpenDelete(true)
            })
    }

    return (
        <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button onClick={handleOpen} variant='contained' color='primary'>Đổi tên</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Đổi Tên</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Hãy nhập tên mới cho lĩnh vực này.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tên"
                        fullWidth
                        onChange={(e) => { setNewName(e.target.value) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleRenameAction} color="primary">
                        Đổi Tên
                    </Button>
                </DialogActions>
            </Dialog>
            <Button disabled={isDisabled} onClick={handleDeleteAction} variant='contained'>Xóa</Button>
            <AlertDialog close={()=>{setOpenDelete(false)}} isOpened={openDelete} value={"Không thể xóa lĩnh vực con này vì lĩnh vực này vẫn còn khóa học"}/>
        </td>
    )
}
