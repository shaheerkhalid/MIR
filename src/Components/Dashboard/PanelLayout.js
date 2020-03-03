import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {PanelListL ,PanelListS} from './PanelList';
import ProfileInfo from './ProfileInfo';
import Listing from './Listing';
import Transaction from './Transaction';
import Account from './Account';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    category1: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'block',
        },
    },
    category2: {
        padding: '0px',
        margin: '0px',
        display: 'block',
        borderRight: '1px solid lightgrey',
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        },
    },
  }));


export default function ProductListing() {

    const classes = useStyles();
    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl" style={{ padding: '15px 25px' }} >
              <Router>
          <Grid container spacing={3}>
            <Grid className={classes.category1} item xs={12}>
                <PanelListS/>
                <hr></hr>
            </Grid>
            <Grid className={classes.category2} item md={2}>
                <PanelListL/>
            </Grid>
            <Grid item xs={12} md={10}>
                        <Switch>
                            <Route path="/ProfileInfo">
                                <ProfileInfo/>
                            </Route>
                            <Route path="/Listing">
                                <Listing/>
                            </Route>
                            <Route path="/Transaction">
                                <Transaction/>
                            </Route>
                            <Route path="/Account">
                                <Account/>
                            </Route>
                        </Switch>
            </Grid>    
          </Grid>
          </Router>
          </Container>
        </React.Fragment>
    );
}