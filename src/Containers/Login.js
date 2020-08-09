import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Link} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {RED} from "../Constants"
import { makeStyles } from "@material-ui/core/styles";
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
    root: {
        height: "100vh"
    },
    image: {
        backgroundImage: "url(https://i.picsum.photos/id/1/5616/3744.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: RED,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

export default function SignInSide() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [email, setemail] = React.useState(null);
    const [pass, setpass] = React.useState(null);
    const [helptext, sethelptext] = React.useState("");

    const handleEmail = e => {
        setemail(e.target.value);
    }

    const handlePass = e => {
        setpass(e.target.value);
    }

    const submitHandler = e => {
        e.preventDefault();
        const data ={
            "email":email,
            "password":pass
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch('http://localhost:5000/Api/User/login', requestOptions)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if(response.success===1){
                dispatch(jsontoken("Bearer "+response.token));
                dispatch(isLog());
                (response.data.user_type==="instructor")?
                    fetch('http://localhost:5000/Api/User/instructordata', requestOptions)
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response.success===1){
                                dispatch(userid(response.data));
                            }
                    })
                :dispatch(userid(response.data));
                sethelptext("");
            }else{
                sethelptext(response.message);
            }
        });
        
            
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={submitHandler}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            type="email"
                            id="email"
                            label="Email Address"
                            name="email"
                            // value={email}
                            onChange={handleEmail}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            // value={password}
                            onChange={handlePass}
                            autoComplete="current-password"
                            helperText={helptext}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type ="submit"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/Signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}