import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function Categories() {
    const classes = useStyles();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    //TODO: GỌI API GET ALL KHÓA HỌC RỒI BỎ VÔ listCategories NÀY NHA, NHỚ THÊM NAVIGATION CHO TỪNG MENUITEMS
    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'Không có khóa học' }])
    //TODO: CHUYỂN ĐẾN TRANG CHỨ DANH SÁCH KHÓA HỌC TƯƠNG ỨNG
    const handleCategoryPage = id => () => {
        console.log(id);
        history.push("/categories/" + id);
    };
    const renderItems = (listCategories) => {
        return (listCategories.map((category) => (
            <MenuItem onClick={handleCategoryPage(category.id)}>{category.categoryName}</MenuItem>
        )))
    }
    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }, []);
    return (
        <div className={classes.root}>
            <div>
                <IconButton
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle} //Show menu user.
                    color="inherit"
                >
                    <Typography className={classes.title} variant="h6" noWrap>
                        Categories
                    </Typography>
                </IconButton>

                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        {renderItems(listCategories)}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
