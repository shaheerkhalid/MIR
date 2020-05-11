import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {RED, WHITE} from "../../Constants";
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import {addtorequest} from '../../Actions'
import {useSelector,useDispatch} from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    formControl: {
        minWidth: 120,
        maxHeight: 50,
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function AddProduct(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const [FromDate, handleFromDateChange] = React.useState(new Date());
    const [ToDate, handleToDateChange] = React.useState(new Date());
    const [selectedValue, setSelectedValue] = React.useState('COD');
    const [open, setOpen] = React.useState(false);
    const jsontoken = useSelector(state => state.jsontoken);
    const userid = useSelector(state => state.userid);
    const proddata = useSelector(state => state.proddata);

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const handleSubmit = e => {
        e.preventDefault();
        if(proddata.product_type==="rent"){
          const data = {
            "renteeid": userid.user_id,
            "prodid": proddata.product_id,
            "onrent": 0,
            "paymentmethod": selectedValue,
            "from": FromDate,
            "to": ToDate,
          }
          fetch('http://localhost:5000/Api/Product/RentRecord',  {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' ,
                                  'Authorization': jsontoken
                              },
                      body: JSON.stringify(data)
                          })
                  .then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                      if(response.success===1){
                        setOpen(true);
                      }
          });
        }else{
          const data = {
            "buyerid": userid.user_id,
            "prodid": proddata.product_id,
            "sellout": 0,
            "paymentmethod": selectedValue,
            "selldate": new Date(),
          }
          fetch('http://localhost:5000/Api/Product/SellRecord',  {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' ,
                                  'Authorization': jsontoken
                              },
                      body: JSON.stringify(data)
                          })
                  .then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                      if(response.success===1){
                          setOpen(true);
                          // document.getElementById("prod").click();
                      }
          });
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
            <Link id="prod" to='/Products'>
            </Link>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography>Choose a payment method</Typography>
                            By Credit Card: <Radio
                                checked={selectedValue === 'CC'}
                                onChange={(e) => {setSelectedValue(e.target.value)}}
                                value="CC"
                                name="radio-button-demo"
                            /><br></br>
                            {(selectedValue==='CC')?
                              <Grid container spacing={2}>  
                                <Grid item xs={7}>
                                  <TextField type="text" id="outlined-basic" label="Card Number" variant="outlined" style={{width: "100%"}}/>
                                </Grid>
                                <Grid item xs={7}>
                                  <TextField type="text" id="outlined-basic" label="Name" variant="outlined" style={{width: "100%"}}/>
                                </Grid>
                                <Grid item xs={7}>
                                  <TextField type="text" id="outlined-basic" label="Card Number" variant="outlined" style={{width: "100%"}}/>
                                </Grid>
                                <Grid item xs={7}>
                                  <TextField type="month" id="outlined-basic" label="Expire Date" variant="outlined" min="2020-07" value="2020-07"/>
                                </Grid>
                              </Grid>
                              :""}
                            
                            Cash on Delivery: <Radio
                                checked={selectedValue === 'COD'}
                                onChange={(e) => {setSelectedValue(e.target.value)}}
                                value="COD"
                                name="radio-button-demo"
                            />
                        </Grid>
                      {(proddata.product_type==="rent")?
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
                  </MuiPickersUtilsProvider>
                      :""}
                        
                    </Grid>
                    <br></br>
                    <Button type="submit" style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Checkout</Button>
                        <br></br>
                        <br></br>
                    <Link to="/Products" id="sub"></Link>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Request Send to User
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </Container>
    );
}