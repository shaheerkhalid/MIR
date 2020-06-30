import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from "@material-ui/core";
import {RED, WHITE} from "../../Constants";
import Rating from '@material-ui/lab/Rating';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AddtoCart(props) {
  const classes = useStyles();
  const userdata = useSelector(state => state.userid);
  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center" >
                <Grid item xs={12} md={10}>
                    <Typography variant="h5">Renter Name: <span style={{fontSize: '16px'}}>{props.renterdata.full_name}</span> <Link to="/ProfileView" style={{fontSize:'12px'}}>See Profile</Link></Typography>
                    <Typography variant="h5">Title: <span style={{fontSize: '16px'}}>{props.proddata.title}</span></Typography> 
                    {(props.proddata.product_type==="rent")?<Typography variant="h6">Price Per Day: <span style={{fontSize: '15px'}}>Rs {props.proddata.price_per_day}/Day</span></Typography>:""}
                    <Typography variant="h6">Description:</Typography>
                    <span >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                      {props.proddata.description}    
                    </span>
                    {(props.proddata.product_type==="rent")?<Typography variant="h6">Net Worth: <span style={{fontSize: '15px'}}>Rs {props.proddata.actual_price}</span></Typography>:
                    <Typography variant="h6">Price: <span style={{fontSize: '15px'}}>Rs {props.proddata.actual_price}</span></Typography>}
                    <Typography variant="h6">Rating: &nbsp;
                    <Rating
                        name="read-only"
                        value= {0}
                        readOnly
                        />
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginTop: '10px',textAlign: 'center'}}>
                <Link id="toPay" to="/Payment"></Link>
                    {(props.proddata.renter_id!==userdata.user_id)?<Button onClick={()=>{document.getElementById('toPay').click()}} underline='none' style={{backgroundColor: RED,color: WHITE,fontWeight: '700',padding: '15px 30px'}}>{(props.proddata.product_type==="rent")?"Rent Instrument":"Buy Instrument"}</Button>:"You can't rent your own product!"}
                </Grid>
      </Grid>
    </div>
  );
}