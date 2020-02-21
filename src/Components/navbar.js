import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {BLACK , WHITE , RED } from '../Constants';
// import {List,ListItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tabcolor: {
    textColor: 'inherit',
  },
  navstyle: {
      background: WHITE,
      color: BLACK,
  }

}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };
  return (
    <div className={classes.grow}>
      <AppBar className={classes.navstyle} position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h4" noWrap style={{color: RED , fontWeight: 'bold'}}>
            MIRS
          </Typography>
          <div className={classes.root}>
            <Button>Contact Us</Button>
            <Button>About Us</Button>
            
          </div>



          {/* <List style={flexContainer}>
            <ListItem>Contact</ListItem>
            <ListItem>About</ListItem>
          </List> */}
            {/* <Tabs aria-label="simple tabs example">
                <Tab label="Post Instrument"/>
                <Tab label="Contact"/>
                <Tab label="About"/>
            </Tabs>  */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Button style={{alignItems: 'right', backgroundColor: RED, color: WHITE}}>Post Instrument</Button>
            <IconButton
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
