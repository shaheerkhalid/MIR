import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Link} from 'react-router-dom';
import {RED, WHITE} from "../../Constants";
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useSelector,useDispatch} from 'react-redux';
import {prodlist, proddata} from "../../Actions";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { getElementError } from "@testing-library/react";

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

    const [phnbr, setphnbr] = React.useState("");
    const [err, seterr] = React.useState(false);
    const [helpphone, sethelpphone] = React.useState("");

    const [cardNbr, setcardNbr] = React.useState("");
    const [name, setname] = React.useState("");
    const [ExpireDate, handleExpireDateChange] = React.useState(new Date());
    
    const [days, setdays] = React.useState(1);
    
    const [selectedValue, setSelectedValue] = React.useState('COD');
    
    const [address, setaddress] = React.useState("");
    const [erraddress, seterraddress] = React.useState(false);
    const [helpaddress, sethelpaddress] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const jsontoken = useSelector(state => state.jsontoken);
    const userid = useSelector(state => state.userid);
    const productdata = useSelector(state => state.proddata);


    function phValid(){
      var re = new RegExp("^[0][3][0-9]{2}[-][0-9]{7}$");
      if(re.test(phnbr)){
        console.log("valid");
        seterr(false);
        sethelpphone("");
      }else{
        console.log("Invalid");
        seterr(true);
        sethelpphone("Incorrect number follow given pattern 03**-*******");
      }
    }

    function addressValid(){
      var re = new RegExp("^.{20,}$");
      if(re.test(address)){
        console.log("valid");
        seterraddress(false);
        sethelpaddress("");
      }else{
        console.log("Invalid");
        seterraddress(true);
        sethelpaddress("Address should be more specific");
      }
    }

      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const handleSubmit = e => {
      e.preventDefault();
      if(address==="" || erraddress || phnbr==="" || err ){
        if(productdata===""){
          document.getElementById('prod').click();
        }
      }else if(productdata===""){
        document.getElementById('prod').click();
      }else{
        if(productdata.product_type==="rent"){
          const data = {
            "renteeid": userid.user_id,
            "prodid": productdata.product_id,
            "onrent": 1,
            "paymentmethod": selectedValue,
            "address": address,
            "contact": phnbr,
            "from": new Date(),
            "days": days
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
                        fetch(`http://localhost:5000/Api/Product/ByUserID`,  {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' ,
                                        'Authorization': jsontoken
                                    },
                            body: JSON.stringify({"product_id":productdata.product_id})
                              
                            })
                          
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response.success===1){
                              fetch('http://localhost:5000/Api/Product',  {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' ,
                                            'Authorization': jsontoken
                                        }
                                    })
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(response => {
                                if(response.success===1){
                                    dispatch(prodlist(response.data));
                                }
                            });
                            }
                        });
                        setOpen(true);
                        setaddress("");
                        setphnbr("");
                        setdays(1);
                        dispatch(proddata(""));
                      }
          });
        }else{
          const data = {
            "buyerid": userid.user_id,
            "prodid": productdata.product_id,
            "paymentmethod": selectedValue,
            "address": address,
            "contact": phnbr,
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
                        fetch(`http://localhost:5000/Api/Product/ByUserID`,  {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' ,
                                        'Authorization': jsontoken
                                    },
                            body: JSON.stringify({"product_id":productdata.product_id})
                              
                                })
                          
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response.success===1){
                              fetch('http://localhost:5000/Api/Product',  {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' ,
                                            'Authorization': jsontoken
                                        }
                                    })
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(response => {
                                if(response.success===1){
                                    dispatch(prodlist(response.data));
                                }
                            });
                            }
                        });  
                        setOpen(true);
                        setaddress("");
                        setphnbr("");
                        setdays(1);
                        dispatch(proddata(""));
                      }
          });
        }
      }
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper} style={{minHeight: '600px'}}>
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
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline" 
                                            inputVariant="outlined"
                                            label="Expire Date"
                                            format="MM/yyyy"
                                            value={ExpireDate}
                                            InputAdornmentProps={{ position: "end" }}
                                            onChange={date => handleExpireDateChange(date)}
                                        />
                                  </MuiPickersUtilsProvider>
                                </Grid>
                              </Grid>
                              :""}
                            
                            Cash on Delivery: <Radio
                                checked={selectedValue === 'COD'}
                                onChange={(e) => {setSelectedValue(e.target.value)}}
                                value="COD"
                                name="radio-button-demo"
                            />
                            <Grid item xs={7}>
                            <TextField error={erraddress} id="outlined-basic" label="Shipment Address" variant="outlined" value={address} style={{width: '100%'}} onChange={(e)=>{
                              setaddress(e.target.value)
                            }} onBlur={addressValid} helperText={helpaddress}/>
                            <br></br>
                            <br></br>
                            </Grid>
                            <Grid item xs={7}>
                            <TextField error={err} id="outlined-basic" label="Contact Number" placeholder="03**-*******" value={phnbr} style={{width: '100%'}} onChange={(e)=>{
                                setphnbr(e.target.value)
                              }} onBlur={phValid} variant="outlined" helperText={helpphone}/>
                              <br></br>
                            <br></br>
                            </Grid>
                      {(productdata.product_type==="rent")?
                        <Grid item xs={7}>
                          <TextField type="number" min="1" max="10" id="outlined-basic" label="How many days" variant="outlined" value={days} onChange={e =>{
                              if(e.target.value>10){
                                setdays(10);
                              }else if(e.target.value<1){
                                setdays(1);
                              }else{
                                setdays(e.target.value);
                              }
                            }} style={{width: "100%"}} />
                        </Grid>
                      :""}
                        </Grid>
                    </Grid>
                    <br></br>
                    <Button type="submit" style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Checkout</Button>
                          {(productdata.product_type==="rent")?<span>Total Bill: Rs {(days*productdata.price_per_day)+500}</span>:<span>Total Bill: Rs {(days*productdata.actual_price)+500}</span>}
                        <br></br>
                        <br></br>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Request Send to User
                        </Alert>
                    </Snackbar>
                    <Link id="prod" to="/Products"></Link>
                </form>
            </div>
        </Container>
    );
}