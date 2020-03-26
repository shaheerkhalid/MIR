import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    padding: '0px',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  links: {
    opacity: '0.7',
    fontSize: '16px',
    fontWeight: '600',
    '&:hover': {
        opacity: '1',
        textDecoration: 'none',
      }
  },
}));

export function PanelListL() {
  const classes = useStyles();

  return (
    <List className={classes.root} >
        <li className={classes.listSection}>
          <ul className={classes.ul}>
              <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="/Dashboard">Profile Information</Link>
                </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/Listing">Products Listing</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/RentingProduct">Renting Products</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/History">Renting History</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/EnrolledCourse">Enrolled Course</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/Account">Account</Link>
           </ListItem>
          </ul>
        </li>
    </List>
  );
}

export function PanelListS() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tag, setTag] = React.useState('Profile Information');

    const handleClick = () => {
        setOpen(!open);
    };

    const handleTag1 = () => {
        setTag('Profile Information');
        setOpen(!open);
    };

    const handleTag2 = () => {
        setTag('Product Listing');
        setOpen(!open);
    };

    const handleTag3 = () => {
        setTag('Renting Products');
        setOpen(!open);
    };

    const handleTag4 = () => {
        setTag('Account');
        setOpen(!open);
    };
    const handleTag5 = () => {
      setTag('Enrolled Course');
      setOpen(!open);
    };
    const handleTag6 = () => {
        setTag('Renting History');
        setOpen(!open);
    };

    return (
        <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={tag} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
                <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="/Dashboard" onClick={handleTag1}>Profile Information</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="/Dashboard/Listing" onClick={handleTag2}>Product Listing</Link>
                </ListItem>
                <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/RentingProduct" onClick={handleTag3}>RentingProducts</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="/Dashboard/History" onClick={handleTag6}>Renting History</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="/Dashboard/EnrolledCourse" onClick={handleTag5}>Enrolled Courses</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="/Dashboard/Account"  onClick={handleTag4}>Account</Link>
                </ListItem>
        </List>
      </Collapse>
    </List>
    );
  }