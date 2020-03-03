import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Shopicon from '@material-ui/icons/ShoppingCartOutlined';
import Infoicon from '@material-ui/icons/InfoOutlined';
import Scheduleicon from '@material-ui/icons/ScheduleOutlined';
// import { RED } from '../../Constants';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      height: '250px',
      color: theme.palette.text.secondary,
    },
  }));



export default function Info(){
        const classes = useStyles();
    return(
            <React.Fragment>
              <CssBaseline />
              <Container className={classes.container} maxWidth="xl" style={{ padding: '50px' }} >
              <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                  <Paper className={classes.paper}>
                    <Shopicon className={classes.iconspace}  style={{color: '1568aa', fontSize: '80px'}}/>
                    <Typography variant='h5'>Try Before You Buy</Typography>
                    <Typography >Confirm an instrument has the feel and the tone you are seeking before actually spending hundreds or thousands of dollars.</Typography>  
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper className={classes.paper}>
                    <Infoicon className={classes.iconspace}  style={{color: '1568aa', fontSize: '80px'}}/>
                    <Typography variant='h5'>Discover More</Typography>
                    <Typography >Infinite options await you. Play an archtop one night, a flat top the next - in the comfort of your home.</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Paper className={classes.paper}>
                    <Scheduleicon className={classes.iconspace}  style={{color: '1568aa', fontSize: '80px'}}/>
                    <Typography variant='h5'>Extend Life</Typography>
                    <Typography >Unplayed guitars and gear end up in closets and landfills. Instruments that get played make the world a better place.</Typography>
                  </Paper>
                </Grid>
                    
              </Grid>
              </Container>
            </React.Fragment>
        );
}