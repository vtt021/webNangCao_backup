import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmDialog(props) {


    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Xác nhận'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.value}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogActions>
                        <Button onClick={props.handleClose} color="primary">
                            Hủy
                        </Button>
                        <Button onClick={props.handleConfirm} color="primary" autoFocus>
                            Xác nhận
                        </Button>
                    </DialogActions>
                </DialogActions>
            </Dialog>
        </div>

    );
}
