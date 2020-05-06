import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DisplayImages from './DisplayImages';
import AddtoCart from './AddtoCart';
import { useSelector } from 'react-redux';

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

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container justify="center" >
        <Grid item xs={12} sm={10}>
            <Grid container>
                <Grid item xs={12} sm={6} >
                    <DisplayImages proddata={proddata}/>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <AddtoCart  proddata={proddata}/>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </div>
  );
}