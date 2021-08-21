import React, { useState} from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { Container, } from 'react-bootstrap'
import Header from '../common/header/header.js'
import Grid from '@material-ui/core/Grid';
import LeftOption from './child_component/leftOption.js';
import Breadcrumb from '../categories_page/child_component/breadcrumb.js';
import PagingCard from '../categories_page/child_component/pagingCourse.js';
import Footer from '../common/footer/footer.js';

export default function SearchPage(props) {
    const history = useHistory();
    const classes = useStyles();

    const [searchText, setSearchText] = useState(props.match.params.keyword === undefined ? '' : props.match.params.keyword);
    const [categoryId, setCategoryId] = useState();
    const [ratingSort, setRatingSort] = useState();
    const [priceSort, setPriceSort] = useState();

    const [categoryName, setCategoryName] = useState(); //Gọi từ DB
    const finalKeyword = props.match.params.keyword === undefined ? '' : props.match.params.keyword;

    const onChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSeachClick = (event) => {
        if (searchText) {
            window.location.replace('/search/' + searchText);
            //window.location.href = '/search/' + searchText;
        }
    };

    const handleCategoryChange = (event) => {
        if (categoryId === event.target.id) {
            setCategoryId(0)
        }
        else {
            setCategoryId(event.target.id)
        }
    };

    const handleRatingSortChange = (event) => {

        if (ratingSort === event.target.id) {
            setRatingSort(0)
        }
        else {
            setRatingSort(event.target.id)
        }
    };

    const handlePriceSortSortChange = (event) => {

        if (priceSort === event.target.id) {
            setPriceSort(0)
        }
        else {
            setPriceSort(event.target.id)
        }
    };
    return (
        <div fluid >
            <Header />
            <div className={classes.root}>
                <Grid container spacing={2}>

                    <Grid item xs='2' container direction="column" spacing={2} >
                        <LeftOption
                            searchText={searchText} onChange={onChange} handleSeachClick={handleSeachClick}
                            categoryId={categoryId} handleCategoryChange={handleCategoryChange}
                            ratingSort={ratingSort} handleRatingSortChange={handleRatingSortChange}
                            priceSort={priceSort} handlePriceSortSortChange={handlePriceSortSortChange}
                        />
                    </Grid>

                    <Grid item xs='10' container direction="column" spacing={2}  >
                        <Breadcrumb keyword={finalKeyword} categoryId={categoryId} categoryName={categoryName} />
                        <PagingCard ratingSort={ratingSort} priceSort={priceSort} category={categoryId} search={finalKeyword}  />
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
        paddingRight: '2%',
        paddingTop: '2%'
    },

}));