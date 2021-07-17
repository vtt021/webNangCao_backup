import React, { useState, useEffect } from 'react';
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
        history.push("/categories/" + categoryId + "/" + id);

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
      <ListItem key='1' button onClick={handleClick.bind(this, 1)}>
        <ListItemText primary="Tên lĩnh vực 1" />
        {(openIndex === 1) ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openIndex === 1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItem button className={classes.nested} onClick={handleClickSubCategory.bind(this, 1,1)}>
            <ListItemText primary="Lĩnh vực phụ 1" />
          </ListItem>

          <ListItem button className={classes.nested} onClick={handleClickSubCategory.bind(this, 1,2)}>
            <ListItemText primary="Lĩnh vực phụ 2" />
          </ListItem>

        </List>
      </Collapse>


      {/*CATEGORY 2*/}
      <ListItem button onClick={handleClick.bind(this, 2)}>

        <ListItemText primary="Tên lĩnh vực 2" />
        {(openIndex === 2) ? <ExpandLess /> : <ExpandMore />}

      </ListItem>

      <Collapse in={openIndex === 2} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>

          <ListItem button className={classes.nested} onClick={handleClickSubCategory.bind(this, 2,1)}>
            <ListItemText primary="Lĩnh vực phụ 1" />
          </ListItem>

          <ListItem button className={classes.nested}>
            <ListItemText primary="Lĩnh vực phụ 2"  onClick={handleClickSubCategory.bind(this, 2,2)} />
          </ListItem>

        </List>
      </Collapse>
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