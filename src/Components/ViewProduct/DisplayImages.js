import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

export default function DisplayImages(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
              <img alt="" src={props.proddata.picture_file_name} width="100%"/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img alt="" src={'https://i.picsum.photos/id/1'+props.proddata.id+'/200/200.jpg'} width="100%"/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img alt="" src={'https://i.picsum.photos/id/1'+props.proddata.id+'/200/200.jpg'} width="100%"/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img alt="" src={'https://i.picsum.photos/id/1'+props.proddata.id+'/200/200.jpg'} width="100%"/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <img alt="" src={'https://i.picsum.photos/id/1'+props.proddata.id+'/200/200.jpg'} width="100%"/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}