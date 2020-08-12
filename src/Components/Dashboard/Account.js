import React from 'react';
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {RED} from "../../Constants";
import { makeStyles } from "@material-ui/core/styles";
import {useSelector} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


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


export default function Account() {
    const classes = useStyles();
    
    const jsontoken = useSelector(state => state.jsontoken);
    const userdata = useSelector(state => state.userid);
    const [oldPassword, setoldPassword] = React.useState("");
    const [oldhelptext, setoldhelptext] = React.useState("");
    const [newPassword, setnewPassword] = React.useState("");
    const [helppass, sethelppass] = React.useState("");
    const [confirmPassword, setconfirmPassword] = React.useState("");
    const [helpmessage, sethelpmessage] = React.useState("");
    
    const [open, setOpen] = React.useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(oldhelptext!=="" || helppass!=="" || helpmessage!=="" || oldPassword==="" || newPassword==="" || confirmPassword===""){
            
        }else{
            fetch('http://localhost:5000/Api/User/UpdatePassword', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': jsontoken,
                        },
                        body: JSON.stringify({
                            "userid": userdata.user_id,
                            "pass": confirmPassword
                        })
                    })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                setoldPassword("");
                setnewPassword("");
                setconfirmPassword("");
                setOpen(true);
            });   
        }
    }

    function passValid(){
        var re = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        if(re.test(newPassword)){
          console.log("valid");
           sethelppass("");
        }else{
          console.log("Invalid");
           sethelppass("Min 6 characters and must contain UPPERCASE, lowercase or Digits");
        }
      }

    return(
        <div>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2} xs={12} sm={8} md={4}>
                        <Grid item xs={12}>
                            <TextField
                                name="oldPassword"
                                variant="outlined"
                                required
                                fullWidth
                                id="oldPassword"
                                label="Old Password"
                                value={oldPassword}
                                onChange={(e)=>{setoldPassword(e.target.value)}}
                                onBlur={()=>{
                                    fetch('http://localhost:5000/Api/User/Password', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json',
                                                    'Authorization': jsontoken,
                                                },
                                                body: JSON.stringify({
                                                    "userid": userdata.user_id,
                                                    "pass": oldPassword
                                                })
                                            })
                                    .then(res => res.json())
                                    .catch(error => console.error('Error:', error))
                                    .then(response => {
                                            if(response.success===1){
                                                setoldhelptext("");
                                            }else{
                                                setoldhelptext("Incorrect Password");
                                            }
                                    });   
                                }}
                                helperText={oldhelptext}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="newpassword"
                                label="New Password"
                                value={newPassword}
                                onChange={(e)=>{setnewPassword(e.target.value)}}
                                onBlur={()=>{
                                    passValid();
                                    if(newPassword!==confirmPassword){
                                        sethelpmessage("Password does not match!");
                                    }else{
                                        sethelpmessage("");
                                    }
                                }}
                                type="password"
                                id="newpassword"
                                helperText={helppass}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmpassword"
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={(e)=>{setconfirmPassword(e.target.value)}}
                                onBlur={()=>{
                                    if(newPassword!==confirmPassword){
                                        sethelpmessage("Password does not match!");
                                    }else{
                                        sethelpmessage("");
                                    }
                                }}
                                type="password"
                                id="confirmpassword"
                                helperText={helpmessage}
                            />
                        </Grid>
                        
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Reset
                    </Button>
                </form>
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Password Updated Successfully!
                    </Alert>
                </Snackbar>
        </div>
    );
}