import React from 'react';
import {
    useRouteMatch,
  } from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {PanelListL ,PanelListS} from './PanelList';
import ProfileInfo from './ProfileInfo';
import ProfileInformation from './ProfileInformation';
import Listing from './Listing';
import SellerHistory from './SellerHistory';
import RenteeHistory from './RenteeHistory';
import RenterHistory from './RenterHistory';
import BuyerHistory from './BuyerHistory';
import Account from './Account';
import {RED, WHITE} from '../../Constants';


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
    let content = <ProfileInformation/>
    const classes = useStyles();
    if(match==='/Dashboard'){
       content = <ProfileInformation/>
    }else if(match==='/Dashboard/EditProfile'){
        content = <ProfileInfo/>
    }else if(match==='/Dashboard/Listing'){
       content = <Listing/>
    }else if(match==='/Dashboard/SellerHistory'){
        content = <SellerHistory/>
    }else if(match==='/Dashboard/BuyerHistory'){
        content = <BuyerHistory/>
    }else if(match==='/Dashboard/RenteeHistory'){
        content = <RenteeHistory/>
    }else if(match==='/Dashboard/RenterHistory'){
        content = <RenterHistory/>
    }else if(match==='/Dashboard/Account'){
        content = <Account/>
    }
    
    return(
        <React.Fragment>
          <CssBaseline />
          <Grid container>
            <Grid className={classes.category1} item xs={12}>
                <PanelListS/>
                <hr></hr>
            </Grid>
            <Grid className={classes.category2} item md={3}>
                <div style={{width:'100%',height:'50px',padding: '5px 15px',backgroundColor:WHITE,border:'1px solid lightgrey'}}>
                    <Typography variant='h4' style={{color: 'grey'}}>Dashboard</Typography>
                </div>
                <PanelListL/>
            </Grid>
            <Grid item xs={12} md={9} style={{minHeight: '572px',padding: '0px 20px'}}>
                        {content}
            </Grid>    
            </Grid>
        </React.Fragment>
    );
}