import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from '../common/header/header';
import Footer from '../common/footer/footer';
import WatchList from './watchList';
import RegistedList from './registeredList';
import UpdateInfo from './updateInfo';
import UpdatePass from './updatePass';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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



export default function PersonalManagement() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Header />
      <div className={classes.contain}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          <Tab label="Danh sách yêu thích" {...a11yProps(0)} />
          <Tab label="Các khóa học đã đăng ký" {...a11yProps(1)} />
          <Tab label="Cập nhật thông tin tài khoản" {...a11yProps(2)} />
          <Tab label="Đổi mật khẩu" {...a11yProps(3)} />

        </Tabs>
        <TabPanel value={value} index={0} className={classes.watchList}>
          <WatchList />
        </TabPanel>

        <TabPanel value={value} index={1} className={classes.watchList}>
          <RegistedList />
        </TabPanel>

        <TabPanel value={value} index={2} className={classes.watchList}>
          <UpdateInfo />
        </TabPanel>

        <TabPanel value={value} index={3} className={classes.watchList}>
          <UpdatePass />
        </TabPanel>
      </div>
      <Footer />
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  contain: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    paddingTop: '1%',
    minHeight: 400
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  watchList: {
    width: '100%',
  }
}));