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
export default function CategoryAction(props) {
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")))
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState("")
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(()=>{
        setAuth(JSON.parse(localStorage.getItem("auth")))
    },[localStorage.getItem("auth")])
    const handleRenameAction = async () => {
        Refreshtoken()
        console.log(auth)
        if (newName != "") {
            const data = {
                id: props.id,
                categoryName: newName
            }
            console.log(data)
            await axios.put('http://localhost:3001/api/categories/', data, {
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

    const handleDeleteAction = async () => {
        Refreshtoken()
        const data = {
            id: props.id
        }
        console.log(data)
        await axios.delete('http://localhost:3001/api/categories/', {
            headers: {
                'x-access-token': auth.accessToken
            },
            data: data
        })
            .then(res => {
                alert("Xóa lĩnh vực thành công")
                window.location.reload()
            }).catch(e => {
                console.log(e);
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
            <Button onClick={handleDeleteAction} variant='contained'>Xóa</Button>
        </td>
    )
}
