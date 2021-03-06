import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import CourseCard from '../../common/courseCard/courseCard.js'
import SpecialCourseCard from '../../common/courseCard/specialCourseCard.js';
export default function PagingCard(props) {
    const numEachPage = 6;
    const classes = useStyles();

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setmaxValue] = useState(numEachPage);
    const [page, setPage] = useState(1);
    const [priceSort, setPriceSort] = useState()
    const [ratingSort, setRatingSort] = useState()
    const [allCategory, setAllCategory] = useState()
    useEffect(() => {
        axios.get(process.env.REACT_APP_API_MAIN + "/sub-categories/all").then(res => {
            setAllCategory(res.data)
        })
            .catch(error => console.log(error));
    }, []);
    const [items, setItems] = useState({})
    const [lastItems, setLastItems] = useState({})
    const [teachers, setTeachers] = useState()

    const handleChange = (event, value) => {
        if (value < 0) {
            console.log('error: current page is smaller 0')
        }
        else {
            setPage(value);
            setMinValue(numEachPage * (value - 1));
            setmaxValue(value * numEachPage)
        }
    };

    const filterItem = async (priceSort, ratingSort) => {
        if (props.category) {
            const filtered = lastItems.filter(d => {
                if (new String(allCategory[d.subCategoryId]).search(new RegExp(props.category, "i")) >= 0) {
                    return d;
                }
                console.log(d.categoryId)
            });
            console.log(props.category)
            setItems(filtered)
        } else {
            setItems(lastItems)
        }

        if (props.priceSort == 0 && props.ratingSort == 0) {
            setItems(lastItems)
        }
        if (ratingSort == 1) {
            const filterItem = await items.sort((a, b) => { return a.rating - b.rating })
            setItems(filterItem)
        }

        if (ratingSort == 2) {
            const filterItem = await items.sort((a, b) => { return a.rating - b.rating }).reverse()
            setItems(filterItem)
        }
        if (priceSort == 3) {
            const filterItem = await items.sort((a, b) => { return a.salePrice - b.salePrice })
            setItems(filterItem)
        }

        if (priceSort == 4) {
            const filterItem = await items.sort((a, b) => { return a.salePrice - b.salePrice }).reverse()
            setItems(filterItem)
        }
    }

    const getCourseItems = () => {
        let url = process.env.REACT_APP_API_MAIN + "/courses/"
        if (props.search) {
            url = url + "search"
        } else {
            if (props.subCategory != null) {
                url = url + "sub-category?subCategoryId=" + props.subCategory
            } else {
                url = url + "category?categoryId=" + props.categoryId
            }
        }
        if (props.search) {
            axios.get(url, {
                params: {
                    keyword: props.search
                }
            }).then(res => {
                const listCourse = res.data.courses;
                setItems(listCourse);
                setLastItems(listCourse);
            }).catch(error => console.log(error));
        } else {
            console.log(url)
            axios.get(url).then(res => {
                const listCourse = res.data;
                setItems(listCourse);
            }).catch(error => console.log(error));
        }
    }

    useEffect(() => {
        getCourseItems()
        console.log(items)
    }, []);
    useEffect(() => {
        setPriceSort(props.priceSort)
        setRatingSort(props.ratingSort)
        filterItem(props.priceSort, props.ratingSort)
    }, [props.category, props.ratingSort, props.priceSort]);
    return (
        <Grid
            className={classes.container}
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            justify="flex-start"
        >
            <Grid container justifyContent="center" justify="center" alignItems="flex-start" spacing={3}>
                {items && items.length > 0 &&
                    items.slice(minValue, maxValue).map((item, i) =>
                    (
                        <Grid key={i} item>
                            <CourseCard key={i} courseInfo={item} tag={1}/>
                        </Grid>
                    )

                    )
                }
                {
                    items && items.length === 0 && (
                        <div> Kh??ng c?? kh??a h???c thu???c l??nh v???c n??y</div>
                    )
                }
            </Grid>

            <Grid container justifyContent="center" justify="center" alignItems="flex-start" spacing={3} className={classes.paginControler}>
                {
                    items &&
                    <Pagination count={Math.ceil(items.length / numEachPage)} page={page} onChange={handleChange} />
                }
            </Grid>
        </Grid>
    );
}
const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        marginTop: 20
    },
    paginControler: {
        display: "flex",
        marginTop: 20,
    }


}));