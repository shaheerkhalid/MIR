import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {RED} from "../Constants";
import {isLog, jsontoken, userid} from "../Actions";
import {useDispatch} from 'react-redux';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" to="/">
                MIRS
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

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

export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [fname, setfname] = React.useState("");
    const [lname, setlname] = React.useState("");
    const [email, setemail] = React.useState("");
    const [pass, setpass] = React.useState("");
    const [fnameerr, setfnameerr] = React.useState(false);
    const [lnameerr, setlnameerr] = React.useState(false);
    const [emailerr, setemailerr] = React.useState(false);
    const [passerr, setpasserr] = React.useState(false);
    const [helpfname, sethelpfname] = React.useState("");
    const [helplname, sethelplname] = React.useState("");
    const [helpemail, sethelpemail] = React.useState("");
    const [helppass, sethelppass] = React.useState("");

    const handleFname = e => {
        setfname(e.target.value);
    }

    function FnameValid(){
        var re = new RegExp("^[A-Za-z]{3,30}$");
        if(re.test(fname)){
          console.log("valid");
          setfnameerr(false);
           sethelpfname("");
        }else{
          console.log("Invalid");
          setfnameerr(true);
           sethelpfname("At least 3 Alphabets");
        }
      }

    const handleLname = e => {
        setlname(e.target.value);
    }

    function LnameValid(){
        var re = new RegExp("^[A-Za-z]{3,30}");
        if(re.test(lname)){
          console.log("valid");
          setlnameerr(false);
           sethelplname("");
        }else{
          console.log("Invalid");
          setlnameerr(true);
           sethelplname("At least 3 Alphabets");
        }
      }

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
    const handlePass = e => {
        setpass(e.target.value);
    }

    function passValid(){
        var re = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if(re.test(pass)){
          console.log("valid");
          setpasserr(false);
           sethelppass("");
        }else{
          console.log("Invalid");
          setpasserr(true);
           sethelppass("Min 6 characters and must contain UPPERCASE, lowercase or Digits");
        }
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(fname==="" || lname==="" || email==="" || pass==="" || fnameerr || lnameerr || emailerr || passerr){
            
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
                        sethelpemail("Email Already Exist");
                        setemailerr(true);
                    }else{
                        const data ={
                            "fullname":fname+" "+lname,
                            "email":email,
                            "usertype":'normal',
                            "password":pass,
                            "phone":'',
                            "address":'',
                            "gender":'Male',
                            "avatar":''
                        }
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        };
            
                        fetch('http://localhost:5000/Api/User', requestOptions)
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response.success===1){
                                fetch('http://localhost:5000/Api/User/login', requestOptions)
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    if(response.success===1){
                                        dispatch(jsontoken("Bearer "+response.token));
                                        dispatch(isLog());
                                        dispatch(userid(response.data));
                                    }
                                });
                            }
                        });
                    }
                });       
            }
        }
    }

    

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={fnameerr}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleFname}
                                onBlur={FnameValid}
                                helperText={helpfname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={lnameerr}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleLname}
                                onBlur={LnameValid}
                                helperText={helplname}
                            />
                        </Grid>
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
                        <Grid item xs={12}>
                            <TextField
                                error={passerr}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                // pattern="^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{5,20}$"
                                onChange={handlePass}
                                onBlur={passValid}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                helperText={helppass}
                            />
                        </Grid>
                        
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/Login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}