import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import VerticalTab from './verticalTab.js'
import MostViewCategories from './mostViewCategories.js'
const useStyles = makeStyles((theme) => ({
    container: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop: 50
    },
}));

export default function LabTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.container}>
            <TabContext value={value}>
                <AppBar position="static">
                    <TabList onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                        <Tab label="Khóa học mới nhất" value="1" />
                        <Tab label="Khóa học được xem nhiều nhất" value="2" />
                        <Tab label="Lĩnh vực được đăng ký nhiều nhất" value="3" />
                    </TabList>
                </AppBar>
                {   //TODO: TRUYỀN THAM SỐ VÀO VerticalTab hoặc MostViewCategories ĐỂ LẤY DỮ LIỆU PHÙ HỢP THEO LOẠI HIỂN THỊ NẾU CẦN
                    //1. Mới nhất
                    //2. Xem nhiều nhất
                    //3. Đăng ký nhiều nhất
                }
                <TabPanel value="1">
                    <VerticalTab /> 
                </TabPanel>

                <TabPanel value="2">
                    <VerticalTab />
                </TabPanel>

                <TabPanel value="3">
                    <MostViewCategories />
                </TabPanel>


            </TabContext>
        </div>
    );
}
