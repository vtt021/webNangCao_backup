import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";



export default function MostViewCategories() {
    const classes = useStyles();
    const history = useHistory();

    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'KHÁC' }])

    const getHotCategory=async()=>{
        await axios.get(process.env.REACT_APP_API_MAIN + "/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }
    
    useEffect(() => {
        const init =async ()=>{
            await getHotCategory()
        }
        init()
    }, []);

    const handleCategoryPage = id => () => {
        console.log(id);
        window.location.href ="/categories/" + id
    };
    return (
        
        <div className={classes.root}>
            {   //Chuyển trang theo từng Category
                listCategories && (listCategories.map((category, i) => (
                    <Button key={i} variant="outlined" color="primary" onClick= {handleCategoryPage(category._id)} size='large'>
                        {category.categoryName}
                    </Button>
                )))
            }
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        minHeight: 200,
    },
}));