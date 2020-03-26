import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }));



export default function Contact(){
        const classes = useStyles();
    return(
            <React.Fragment>
              <CssBaseline />
              <Container className={classes.container} maxWidth="xl" style={{ padding: '50px',minHeight: '571px'}} >
              <Grid container spacing={3}>
              <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant='h5'>Contact MIRS:</Typography>
                    <br></br>
                    <Typography>Contact us on the following email: mirs@gmail.com</Typography>  
                  </Paper>
                </Grid>
              </Grid>
              </Container>
            </React.Fragment>
        );
}