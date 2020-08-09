import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DisplayImages from './DisplayImages';
import RentProd from './RentProd';
import { useSelector } from 'react-redux';
import {WHITE} from '../../Constants';
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
}));

export default function ProductView() {
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
        <Grid item xs={12} md={10}>
            <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Paper elevation={0} style={{width: '100%',padding: '20px',backgroundColor:WHITE}}><Typography variant='h5' style={{color: 'grey'}}>Product View</Typography></Paper>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <DisplayImages proddata={proddata}/>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <RentProd  proddata={proddata} renterdata={renterdata}/>
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