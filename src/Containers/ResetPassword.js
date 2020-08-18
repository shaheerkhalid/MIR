import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import TextField from "@material-ui/core/TextField";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {RED} from "../Constants";
import { makeStyles } from "@material-ui/core/styles";
import {useSelector, useDispatch} from 'react-redux';
import {message} from '../Actions';

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


export default function ResetPassword() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const email = useSelector(state => state.email);
    const [verify, setverify] = React.useState(false)
    const token= "Bearer "+window.location.search.split("=")[1];

    const [newPassword, setnewPassword] = React.useState("");
    const [helppass, sethelppass] = React.useState("");
    const [confirmPassword, setconfirmPassword] = React.useState("");
    const [helpmessage, sethelpmessage] = React.useState("");
    
    React.useEffect(()=>{
        fetch('http://localhost:5000/Reset',  {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' ,
                        'Authorization': token
                    }
                })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            if(response.success===1){
                setverify(true);
            }
        });       
      },[]);

      const handleSubmit = (e) => {
        e.preventDefault();
        if(helppass!=="" || helpmessage!=="" || newPassword==="" || confirmPassword===""){
            
        }else{
            fetch('http://localhost:5000/Api/User/UpdatePasswordByEmail', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "useremail": email,
                            "pass": confirmPassword
                        })
                    })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                setnewPassword("");
                setconfirmPassword("");
                dispatch(message("Password Changed Successfully"))
                document.getElementById('login').click();
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
            <Navbar/>
            <Link id="login" to="/Login" ></Link>
            {verify?<div style={{minHeight: '500px'}}>
            <form style={{marginLeft: '100px'}} className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2} xs={12} sm={8} md={4}>
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
            </div>:<div style={{minHeight: '500px'}}>
                <h5>Page Not Found</h5>
                </div>}
            <Footer/>
        </div>    
    );
} 