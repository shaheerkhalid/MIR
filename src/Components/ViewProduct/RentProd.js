import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from "@material-ui/core";
import {RED, WHITE} from "../../Constants";
import Rating from '@material-ui/lab/Rating';
import {addtocart} from '../../Actions';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AddtoCart(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center" >
                <Grid item xs={10}>
                    <Typography variant="h5">Renter Name: <span style={{fontSize: '16px'}}>{props.renterdata.full_name}</span> <Link to="/ProfileView" style={{fontSize:'12px'}}>See Profile</Link></Typography>
                    <Typography variant="h5">Title: <span style={{fontSize: '16px'}}>{props.proddata.title}</span></Typography> 
                    <Typography variant="h6">Price Per Day: <span style={{fontSize: '15px'}}>Rs {props.proddata.price_per_day}/Day</span></Typography>
                    <Typography variant="h6">Description:</Typography>
                    <span >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                      {props.proddata.description}    
                    </span>
                    <Typography variant="h6">Net Worth: <span style={{fontSize: '15px'}}>Rs {props.proddata.actual_price}</span></Typography>
                    <Typography variant="h6">Rating: &nbsp;
                    <Rating
                        name="read-only"
                        value= {props.proddata.product_id%6}
                        readOnly
                        />
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{marginTop: '10px'}}>
                <Link to="/Payment" underline='none'>
                    <Button underline='none' style={{backgroundColor: RED,color: WHITE, width: '100%',fontWeight: '700',padding: '15px 20px'}}>{(props.proddata.product_type==="rent")?"Rent Instrument":"Buy Instrument"}</Button>
                </Link>
                </Grid>
      </Grid>
    </div>
  );
}