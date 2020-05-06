import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
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
            <Link color="inherit" href="https://material-ui.com/">
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

    const [fname, setfname] = React.useState(null);
    const [lname, setlname] = React.useState(null);
    const [email, setemail] = React.useState(null);
    const [pass, setpass] = React.useState(null);

    const handleFname = e => {
        setfname(e.target.value);
    }

    const handleLname = e => {
        setlname(e.target.value);
    }

    const handleEmail = e => {
        setemail(e.target.value);
    }

    const handlePass = e => {
        setpass(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data ={
            "fullname":fname+" "+lname,
            "email":email,
            "usertype":'rentee',
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
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleFname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleLname}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                pattern="^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{5,20}$"
                                onChange={handlePass}
                                type="password"
                                id="password"
                                autoComplete="current-password"
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
                            <Link href="#" variant="body2">
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