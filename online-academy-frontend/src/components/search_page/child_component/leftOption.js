import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, InputAdornment, InputBase, Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function LeftOption(props) {
    const classes = useStyles();
    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'Không có khóa học' }])
    
    const getListCategory = async () =>{
        axios.get(process.env.REACT_APP_API_MAIN + "/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }
    
    useEffect(() => {
        const init =async ()=>{
            await getListCategory()
        }
        init()
    }, []);
    return (
        <Grid container direction="column" justifyContent='flex-start'>
            <div className={classes.container}>
                <InputBase id="standard-basic" className={classes.search}
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    placeholder="Tìm kiếm…"
                    value={props.searchText}
                    onChange={props.onChange}
                    endAdornment={
                        <InputAdornment>
                            <IconButton onClick={props.handleSeachClick}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />

            </div>

            <FormControl component="fieldset" className={classes.checkedContainer}>
                <FormLabel component="legend" className={classes.checkedTilte} >Lọc theo</FormLabel>
                <FormGroup column>
                    {
                        listCategories.map((items)=>{
                            return (<FormControlLabel
                                control={<Checkbox
                                checked={props.categoryId === items._id}
                                onChange={props.handleCategoryChange}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                id={items._id}
                            />}
                        label={items.categoryName}
                    />)
                        })
                    }

                </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className={classes.checkedContainer}>
                <FormLabel component="legend" className={classes.checkedTilte} >Sắp xếp theo</FormLabel>
                <FormGroup column>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.ratingSort === '1'}
                                onChange={props.handleRatingSortChange}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                id='1'
                            />}
                        label="Đánh giá tăng dần"
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={props.ratingSort === '2'}
                            onChange={props.handleRatingSortChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            id='2'
                        />}
                        label="Đánh giá giảm dần"
                    />
                    <hr />
                    <FormControlLabel
                        control={<Checkbox
                            checked={props.priceSort === '3'}
                            onChange={props.handlePriceSortSortChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            id='3'
                        />}
                        label="Học phí tăng dần"
                    />
                    <FormControlLabel
                        control={<Checkbox
                            checked={props.priceSort === '4'}
                            onChange={props.handlePriceSortSortChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                            id='4'
                        />}
                        label="Học phí giảm dần"
                    />
                </FormGroup>
            </FormControl>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        marginTop: 30,
        borderBottom: '2px solid',
        borderRight: '2px solid',


    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
    checkedContainer: {
        marginTop: 30,

    },
    checkedTilte: {
        fontSize: 25,
        marginTop: 20,
        color: '#77a4df'
    }
}));