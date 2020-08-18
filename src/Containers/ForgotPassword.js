import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {RED} from "../Constants";
import {Email,message} from "../Actions";
import {useDispatch} from 'react-redux';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(12),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: RED,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));



export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setemail] = React.useState("");
    const [emailerr, setemailerr] = React.useState(false);
    const [helpemail, sethelpemail] = React.useState("");
    const dispatch = useDispatch();

    const handleEmail = e => {
        setemail(e.target.value);
    }

    function emailValid(){
        var re = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$");
        if(re.test(email)){
          console.log("valid");
          setemailerr(false);
           sethelpemail("");
        }else{
          console.log("Invalid");
          setemailerr(true);
           sethelpemail("Enter valid email address");
        }
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        if(email==="" || emailerr){
            
        }else{
            if(!emailerr){
                fetch('http://localhost:5000/Api/User/Email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({"email":email})
                })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                    if(response.success===1){
                        fetch('http://localhost:5000/Api/User/ForgotPassword', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({"email":email})
                    })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        setemail("");
                        dispatch(Email(email));
                        dispatch(message("Mail Sent! Check Your Mail"))
                        document.getElementById('login').click();
                    })
                        }
                        
                });       
            }
        }
    }
    return(
        <div>
            <Navbar/>
            <Link id="login" to="/Login" ></Link>
            <div style={{minHeight: '500px'}}>
            <form style={{marginLeft: '100px'}} className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} xs={12} sm={8} md={4}>
                    <Grid item xs={12}>
                    <TextField
                        error={emailerr}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        // pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleEmail}
                        onBlur={emailValid}
                        helperText={helpemail}
                    />
                    </Grid>
                </Grid>
                
                <Button
                            type="submit"
                            
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                </form>
            </div>
            <Footer/>
        </div>    
    );
} 