import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useHistory } from "react-router-dom";


export default function LeftList(props) {

    const getSubCategory = () => {
        axios.get(process.env.REACT_APP_API_MAIN + "/sub-categories/").then(res => {
            setListSub(res.data)
        }).catch(error => console.log(error))
    }

    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'Không có khóa học' }])
    const [listSubCategory, setListSub] = useState([{}])

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_MAIN + "/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        getSubCategory()
    }, [listCategories]);


    const classes = useStyles();
    const history = useHistory();

    const [openIndex, setOpenIndex] = useState(0);

    const handleClick = (id) => {

        if (openIndex === id) {
            setOpenIndex(0);
        }
        else {
            setOpenIndex(id);
        }

    };
    const handleClickSubCategory = (categoryId, id) => {
        window.location.href = "/categories/" + categoryId + "/" + id
        //window.location.reload();

    };

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" className={classes.subHeader}>
                    Các lĩnh vực
                </ListSubheader>
            }
            className={classes.root}
        >

            {/*CATEGORY 1*/}
            {listCategories.map((category,index) => {
                return(
                <>
                <ListItem key={new String(index+1)} button onClick={handleClick.bind(this, index+1)}>
                    <ListItemText primary={category.categoryName} />
                    {(openIndex === (index+1)) ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={openIndex === (index+1)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {listSubCategory.map((sub,subIndex)=>{
                        if((new String(sub.categoryId)).localeCompare(new String(category._id))===0){
                        return(
                        <ListItem button className={classes.nested} onClick={handleClickSubCategory.bind(this, category._id,sub._id)}>
                        <ListItemText primary={sub.subCategoryName} />
                    </ListItem>
                )}})}
                    </List>
                </Collapse>
                </>
                )
            })}
        </List>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginTop: 30
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    subHeader: {
        fontSize: 30,
        color: '#77a4df'
    }
}));