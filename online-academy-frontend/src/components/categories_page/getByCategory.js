import React, {useState,useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

import { Container, } from 'react-bootstrap'
import Header from '../common/header/header.js'
import Grid from '@material-ui/core/Grid';
import Breadcrumb from '../categories_page/child_component/breadcrumb.js';
import PagingCard from './child_component/pagingCourse.js';
import Footer from '../common/footer/footer.js';
import LeftList from './child_component/leftList.js';
export default function CategoryPage(props) {
    const classes = useStyles();

    const categoryId = props.match.params.id
    const [categoryName,setName] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3001/api/categories/id?id="+categoryId).then(res => {
            const listCategories = res.data;
            setName(res.data.categoryName)
            console.log(res.data)
        })
            .catch(error => console.log(error));
    }, []);
    return (
        <div fluid >
            <Header />
            <div className={classes.root}>
                <Grid container spacing={2}>

                    <Grid item xs='2' container direction="column" spacing={2} >
                        <LeftList categoryId/>
                    </Grid>

                    <Grid item xs='10' container direction="column" spacing={2} >
                        <Breadcrumb categoryId={categoryId} categoryName={categoryName} />
                        <PagingCard search={false} categoryId={categoryId} />
                    </Grid>

                </Grid>
            </div>
            <Footer />
        </div>


    )
}
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: '2%',
        paddingRight: '2%'   
    },

}));