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
import {useSelector} from 'react-redux';

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
  const userData = useSelector(state => state.userid);

  return (
    <List className={classes.root} >
        <li className={classes.listSection}>
          <ul className={classes.ul}>
              <ListItem className={classes.listitem}>
                  <Link className={classes.links} color='primary' underline='none' to="/Dashboard">Profile Information</Link>
              </ListItem>
              {(userData.user_type==="admin")&&<ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/AllProducts">All Products</Link>
              </ListItem>}
              {(userData.user_type==="admin")&&<ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/AllCourses">All Courses</Link>
              </ListItem>}
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/Listing">Products Listing</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/RenterHistory">Renter History</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/RenteeHistory">Rentee History</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/SellerHistory">Seller History</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/BuyerHistory">Buyer History</Link>
              </ListItem>
              <ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/EnrolledCourses">Enrolled Courses</Link>
              </ListItem>
              {(userData.user_type==="instructor"||userData.user_type==="admin")&&<ListItem className={classes.listitem}>
                <Link className={classes.links} color='primary' underline='none' to="/Dashboard/Courses">Courses</Link>
              </ListItem>}
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
    const userData = useSelector(state => state.userid);

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
                {(userData.user_type==="admin")&&<ListItem >
                  <Link className={classes.links} name='All Products' color='primary' underline='none' to="/Dashboard/AllProducts" onClick={handleTag}>All Products</Link>
                </ListItem>}
                {(userData.user_type==="admin")&&<ListItem >
                  <Link className={classes.links} name='All Courses' color='primary' underline='none' to="/Dashboard/AllCourses" onClick={handleTag}>All Courses</Link>
                </ListItem>}
                <ListItem >
                  <Link className={classes.links} name='Product Listing' color='primary' underline='none' to="/Dashboard/Listing" onClick={handleTag}>Product Listing</Link>
                </ListItem>
                <ListItem >
                <Link className={classes.links} name='Renter History' color='primary' underline='none' to="/Dashboard/RenterHistory" onClick={handleTag}>Renter History</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} name='Rentee History' color='primary' underline='none' to="/Dashboard/RenteeHistory" onClick={handleTag}>Rentee History</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} name='Seller History' color='primary' underline='none' to="/Dashboard/SellerHistory" onClick={handleTag}>Seller History</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} name='Buyer History' color='primary' underline='none' to="/Dashboard/BuyerHistory" onClick={handleTag}>Buyer History</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} name='Enrolled Courses' color='primary' underline='none' to="/Dashboard/EnrolledCourses" onClick={handleTag}>Enrolled Courses</Link>
                </ListItem>
                {(userData.user_type==="instructor"||userData.user_type==="admin")&&<ListItem >
                  <Link className={classes.links} name='Courses' color='primary' underline='none' to="/Dashboard/Courses" onClick={handleTag}>Courses</Link>
                </ListItem>}
                <ListItem >
                  <Link className={classes.links} name='Account' color='primary' underline='none' to="/Dashboard/Account"  onClick={handleTag}>Account</Link>
                </ListItem>
        </List>
      </Collapse>
    </List>
    );
  }