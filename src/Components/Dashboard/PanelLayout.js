import React from 'react';
import {
    useRouteMatch,
  } from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {PanelListL ,PanelListS} from './PanelList';
import ProfileInfo from './ProfileInfo';
import Listing from './Listing';
import EnrolledCourse from './EnrolledCourse';
import History from './History';
import RentingProducts from './RentingProduct';
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
    const match = useRouteMatch().path;
    let content = <ProfileInfo/>
    const classes = useStyles();
    if(match==='/Dashboard'){
       content = <ProfileInfo/>
    }else if(match==='/Dashboard/Listing'){
       content = <Listing/>
    }else if(match==='/Dashboard/EnrolledCourse'){
        content = <EnrolledCourse/>
    }else if(match==='/Dashboard/History'){
        content = <History/>
    }else if(match==='/Dashboard/RentingProduct'){
        content = <RentingProducts/>
    }else if(match==='/Dashboard/Account'){
        content = <Account/>
    }
    
    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl" style={{ padding: '15px' }} >
          <Grid container spacing={3}>
            <Grid className={classes.category1} item xs={12}>
                <PanelListS/>
                <hr></hr>
            </Grid>
            <Grid className={classes.category2} item md={3}>
                <PanelListL/>
            </Grid>
            <Grid item xs={12} md={9} style={{minHeight: '572px',padding: '0px 50px'}}>
                        {content}
            </Grid>    
            </Grid>
          </Container>
        </React.Fragment>
    );
}