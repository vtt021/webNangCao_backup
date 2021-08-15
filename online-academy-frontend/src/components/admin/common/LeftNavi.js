import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';





export default function LeftNavi(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button component="a" href="/admin/categories" divider={true} selected={props.selected === '0'}>
                    <ListItemText primary="Quản lý danh mục" />
                </ListItem>
                <ListItem button component="a" href="/admin/sub-categories" divider={true} selected={props.selected === '1'}>
                    <ListItemText primary="Quản lý danh mục phụ" />
                </ListItem>
                <ListItem button component="a" href="/admin/users" divider={true} selected={props.selected === '2'}>
                    <ListItemText primary="Quản lý người dùng" />
                </ListItem>
                <ListItem button component="a" href="/admin/courses" divider={true} selected={props.selected === '3'}>
                    <ListItemText primary="Quản lý khóa học" />
                </ListItem>
            </List>
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));