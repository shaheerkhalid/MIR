import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {RED, WHITE} from "../../Constants";
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {useSelector,useDispatch} from 'react-redux';
import {userid,instructor} from "../../Actions";


const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: '600px',
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function AddInstructor() {
    const classes = useStyles();
    const [expertise, setExpertise] = React.useState();
    const [experience, setExperience] = React.useState();
    const [description, setDescription] = React.useState();

    const jsontoken = useSelector(state => state.jsontoken);
    const userID = useSelector(state => state.userid);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/Api/User/AddInstructor',  {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                            'Authorization': jsontoken,
                        },
                        body: JSON.stringify({
                            "userid": userID.user_id,
                            "expertise": expertise,
                            "experience": experience,
                            "description": description
                        })
                    })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.success===1){
                    fetch('http://localhost:5000/Api/User/UpdateUserType',  {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json',
                                    'Authorization': jsontoken,
                                },
                                body: JSON.stringify({
                                    "usertype": "instructor",
                                    "userid": userID.user_id
                                })
                            })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                            if(response.success===1){
                                fetch(`http://localhost:5000/Api/User/GetInstructor/${userID.user_id}`,{
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json',
                                                'Authorization': jsontoken,
                                            },
                                        })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    if(response.success===1){ 
                                        dispatch(instructor(response.data));
                                    }
                                });
                                fetch(`http://localhost:5000/Api/User/${userID.user_id}`,{
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json',
                                                'Authorization': jsontoken,
                                            },
                                        })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    if(response.success===1){ 
                                        dispatch(userid(response.data));
                                    }
                                });
                            }
                    });
                }
            })
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
            <form id="myform" >
            </form>
                <form id="addform" onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={1} sm={2} md={3}></Grid>
                        <Grid item xs={10} sm={8} md={6}>
                            <Typography variant="h6">Give Following Details to Become an Instructor</Typography>
                            <br></br>
                            <TextField autoFocus id="outlined-basic" label="Expertise" variant="outlined" onChange={(e)=>{setExpertise(e.target.value)}} style={{width: "100%"}}/>
                            <br></br>
                            <br></br>
                            <TextField id="outlined-basic" label="Experience" variant="outlined" onChange={(e)=>{setExperience(e.target.value)}} style={{width: "100%"}}/>
                            <br></br>
                            <br></br>
                            <TextField id="outlined-basic" label="Description" multiline rows={4} variant="outlined" onChange={(e)=>{setDescription(e.target.value)}} style={{width: "100%"}}/>
                            <br></br>
                            <br></br>
                            <Button type="submit" style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Submit</Button>
                        </Grid>
                        <Grid item xs={1} sm={2} md={3}></Grid>
                    </Grid>
                    <br></br>
                </form>
            </div>
        </Container>
    );
}