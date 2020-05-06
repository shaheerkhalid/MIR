import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from "@material-ui/core";
import {RED, WHITE} from "../../Constants";
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function AddtoCart(props) {
  const classes = useStyles();

  const [FromDate, handleFromDateChange] = useState(new Date());
  const [ToDate, handleToDateChange] = useState(new Date());


  const handleAddCart = () => {
    console.log(FromDate);
    console.log(ToDate);
    
  }


  return (
    <div className={classes.root}>
      <Grid container spacing={2} justify="center" >
                <Grid item xs={10}>
                    <Typography variant="h4">{props.proddata.title}</Typography>
                    <Typography variant="h5">{props.proddata.price_per_day}</Typography>
                    <Typography variant="h6">Description:</Typography>
                    <Typography >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur.    
                    </Typography>
                      <Typography variant="h6">{props.proddata.description}</Typography>
                    <Typography variant="h6">Rating: &nbsp;
                    <Rating
                        name="read-only"
                        value= {props.proddata.product_id%6}
                        readOnly
                        />
                    </Typography>
                    
                </Grid>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid item xs={5} style={{marginTop: '10px'}}>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="From"
                        format="MM/dd/yyyy"
                        value={FromDate}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={date => handleFromDateChange(date)}
                    />
                </Grid>
                <Grid item xs={5} style={{marginTop: '10px'}}>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label="To"
                        format="MM/dd/yyyy"
                        value={ToDate}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={date => handleToDateChange(date)}
                    />
                </Grid>
                <Grid item xs={6} style={{marginTop: '10px'}}>
                    <Button onClick={handleAddCart} style={{backgroundColor: RED,color: WHITE, width: '100%',fontWeight: '700',padding: '15px 20px'}}>Add to Cart</Button>
                </Grid>    
            </MuiPickersUtilsProvider>
      </Grid>
    </div>
  );
}