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
  const dispatch = useDispatch();
  const userdata = useSelector(state => state.userid);


  const handleAddCart = () => {
    dispatch(addtocart(props.proddata));
  }


  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center" >
                <Grid item xs={10}>
                    <Typography variant="h5">{props.proddata.title}</Typography>
                    <Typography variant="h6">Price per Day: Rs. {props.proddata.price_per_day}</Typography>
                    <Typography variant="h6">Description:</Typography>
                    <Typography >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    {props.proddata.description}    
                    </Typography>
                    <Typography variant="h6">Net Worth: Rs. {props.proddata.actual_price}</Typography>
                    <Typography variant="h6">Rating: &nbsp;
                    <Rating
                        name="read-only"
                        value= {props.proddata.product_id%6}
                        readOnly
                        />
                    </Typography>
                </Grid>
                <Grid item xs={6} style={{marginTop: '10px'}}>
                <Link to={(userdata.address==="")?'/Dashboard':'/Payment'}>
                    <Button onClick={handleAddCart} style={{backgroundColor: RED,color: WHITE, width: '100%',fontWeight: '700',padding: '15px 20px'}}>{(props.proddata.product_type==="rent")?"Rent Instrument":"Buy Instrument"}</Button>
                </Link>
                </Grid>
      </Grid>
    </div>
  );
}