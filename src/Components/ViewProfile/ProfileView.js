import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { useSelector } from 'react-redux';
import {WHITE} from '../../Constants';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  container: {
    padding: '20px',
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

export default function ProfileView() {
  const classes = useStyles();
  const proddata = useSelector(state => state.proddata);

  const [renterdata, setrenterdata] = React.useState("");

  React.useEffect(()=>{
              fetch(`http://localhost:5000/Api/USER/${proddata.renter_id}`,  {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json'
                            }
                        })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if(response.success===1){
                      console.log(response.data.full_name);
                        setrenterdata(response.data);
                    }
                });
  },[]);

  return (
    (renterdata!=="")?
    <div className={classes.root}>
      <Grid className={classes.container} container justify="center" >
        <Grid item xs={12} sm={10}>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Paper elevation={0} style={{width: '100%',padding: '20px',backgroundColor:WHITE}}><Typography variant='h5' style={{color: 'grey'}}>Profile View</Typography></Paper>
                </Grid>
                <Grid item xs={12} sm={6} justify="center">
                    <Avatar alt={renterdata.full_name} src={renterdata.avatar} className={classes.large} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography style={{marginTop: '75px'}} variant="h5">Name: <span style={{fontSize: '16px'}}>{renterdata.full_name}</span></Typography>
                    <Typography variant="h6">Email Address: <span style={{fontSize: '16px'}}>{renterdata.email}</span></Typography> 
                    <Typography variant="h6">About: </Typography>
                    <span >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                      {renterdata.about}    
                    </span>
                    <Typography variant="h6">Rating: &nbsp;
                    <Rating
                        name="read-only"
                        value= {0}
                        readOnly
                        />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={0} style={{width: '100%',padding: '10px',backgroundColor:WHITE}}><Typography variant='h5' style={{color: 'grey'}}>Reviews: </Typography></Paper>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </div>:<div>
                    <Backdrop className={classes.backdrop} open>
                        <CircularProgress color="primary" />
                    </Backdrop>
                </div>
  );
}