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
import {RED} from "../Constants"
// import Tooltip from "@material-ui/core/Tooltip";

// state = {
//     name: "",
//     email: "",
//     password: "",

// };
// handleChange = e => {
//     const name = e.target.name;
//     const value = e.target.value;
//     this.setState({ [name]: value });
// };
// handleConfirmPassword = event => {
//     this.setState({ confirmPassword: event.target.value });
// };
// function resetState() {
//     const name = "",
//         password = "",
//         email = "",

//     this.setState({ name, password, email, confirmPassword });
// }
// handleClick = async e => {
//     e.preventDefault();
//     if (
//         (this.state.name &&
//             this.state.password &&
//             this.state.email) !== ""
//     ) {

//             try {
//                 const { name, email, password } = this.state;
//                 const requestData = { name, email, password };
//                 const { data } = await axios.post(
//                     "/api/create-user",
//                     this.state
//                 );
//                 console.log("");
//                 toast.success("Sign Up Successfull Login Now");
//                 this.resetState();
//                 window.location = "/login";
//                 console.log(data);
//             } catch (error) {
//                 toast.error("User Already Exist");
//             }
//         }

//         toast.error("kindly fill all fields");

// };






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
                <form className={classes.form} noValidate>
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
                                // onChange={this.handleChange}
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            {/* <Tooltip
                                title={
                                    "Password Must include a character number upper case alphabet Length should be greater than 4 "
                                }
                            ></Tooltip> */}
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