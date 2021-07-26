import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MultiCarousel from '../../../common/carousel/multiCarousel';
import { Grid } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            className={classes.carouselContainer}
            {...other}
        >
            {value === index && (
                <Grid container spacing={2} justifyContent="center" display="flex" alignItems="center">
                    <MultiCarousel />
                </Grid>

            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}



export default function VerticalTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [listCategories, setListCategories] = useState([{ id: 1, categoryName: 'KHÁC' }])
    useEffect(() => {
        axios.get("http://localhost:3001/api/categories").then(res => {
            const listCategories = res.data;
            setListCategories(listCategories);
        })
            .catch(error => console.log(error));
    }, []);



    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {
                listCategories && (listCategories.map((category, i) => (
                    <Tab label={category.categoryName} {...a11yProps({i})} />
                ))) 
            }
            </Tabs>
            { //TODO: TRUYỀN THAM SỐ VÀO MultiCarousel ĐỂ LẤY DỮ LIỆU PHÙ HỢP THEO 
                //1. Theo category.id 
                //2. Loại hiển thị (Mới nhất, Xem nhiều nhất, Đăng ký nhiều nhất) => cái này được truyền vào từ horizonalTab
                listCategories && (listCategories.map((category, i) => (
                    <TabPanel value={value} index={i}>
                        <MultiCarousel />
                    </TabPanel>
                ))) 
            }
        </div>
    );
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        minHeight: 500
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    carouselContainer: {
        padding: theme.spacing(2),
        margin: 'auto',
        justifyContent: "center",
        alignItems: "flex-start",
        justify: "center"

    },

}));