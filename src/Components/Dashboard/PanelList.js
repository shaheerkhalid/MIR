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
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 500,
    padding: '0px',
    margin: '20px 0px',
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
                  <Link className={classes.links} color='primary' underline='none' to="ProfileInfo">Profile Information</Link>
                </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="Listing">Listing</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="Transaction">Transaction</Link>
              </ListItem>
              <ListItem >
                <Link className={classes.links} color='primary' underline='none' to="Account">Account</Link>
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
        setTag('Listing');
        setOpen(!open);
    };

    const handleTag3 = () => {
        setTag('Transaction');
        setOpen(!open);
    };

    const handleTag4 = () => {
        setTag('Account');
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
                  <Link className={classes.links} color='primary' underline='none' to="ProfileInfo" onClick={handleTag1}>Profile Information</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="Listing" onClick={handleTag2}>Listing</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="Transaction" onClick={handleTag3}>Transaction</Link>
                </ListItem>
                <ListItem >
                  <Link className={classes.links} color='primary' underline='none' to="Account" onClick={handleTag4}>Account</Link>
                </ListItem>
        </List>
      </Collapse>
    </List>
    );
  }