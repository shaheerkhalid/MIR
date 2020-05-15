import React from 'react';
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {WHITE} from '../../Constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    padding: '0px',
    margin: '0px',
  },
  listSection: {
    backgroundColor: 'inherit',
    margin: 0,
    padding: 0,
  },
  ul: {
    backgroundColor: 'inherit',
    margin: 0,
    padding: 0,
  },
  links: {
    opacity: '0.7',
    fontSize: '16px',
    fontWeight: '600',
    height: '42px',
    width: '100%',
    margin: 0,
    padding: '10px 20px',
    verticalAlign: 'middle',
    borderTop: '1px solid lightgrey',
    '&:hover': {
        opacity: '1',
        textDecoration: 'none',
        backgroundColor: WHITE,
      }
  },
  listitem: {
    margin: 0,
    padding: 0,
  },
}));

export function PanelListL() {
  const classes = useStyles();

  return (
    <List className={classes.root} >
        <li className={classes.listSection}>
          <ul className={classes.ul}>
              <ListItem className={classes.listitem}>
                  <Link className={classes.links} color='primary' underline='none' to="/Dashboard">Profile Information</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/Listing">Products Listing</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/RentingProduct">Renting Products</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/History">Renting History</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/EnrolledCourse">Enrolled Course</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
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

    const handleTag = e => {
      setTag(e.target.name);
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
                  <Link className={classes.links} name='Profile Information' color='primary' underline='none' to="/Dashboard" onClick={handleTag}>Profile Information</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} name='Product Listing' color='primary' underline='none' to="/Dashboard/Listing" onClick={handleTag}>Product Listing</Link>
                </ListItem>
                <ListItem >
                <Link className={classes.links} name='Renting Products' color='primary' underline='none' to="/Dashboard/RentingProduct" onClick={handleTag}>Renting Products</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} name='Renting History' color='primary' underline='none' to="/Dashboard/History" onClick={handleTag}>Renting History</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} name='Enrolled Courses' color='primary' underline='none' to="/Dashboard/EnrolledCourse" onClick={handleTag}>Enrolled Courses</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} name='Account' color='primary' underline='none' to="/Dashboard/Account"  onClick={handleTag}>Account</Link>
                </ListItem>
        </List>
      </Collapse>
    </List>
    );
  }