import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {WHITE,BLACK,RED} from '../Constants';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    button: {
      padding: theme.spacing(2),
      textAlign: 'center',
      width: '100%',
      color: WHITE,
      fontWeight: 'bolder',
      backgroundRepeat: 'no-repeat',
      fontSize: '20px',
      height: '200px',
      '&:hover': {
            opacity: '0.7',
            color: RED,
      }
    },
  }));



export default function BrowseGrid(){
        const classes = useStyles();
    return(
            <React.Fragment>
              <CssBaseline />
              <Container className={classes.container} maxWidth="xl" style={{ padding: '50px' }} >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button className={classes.button} style={{backgroundImage: 'url(https://i.picsum.photos/id/502/1366/300.jpg)',}}>For Rent</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className={classes.button} style={{backgroundImage: 'url(https://i.picsum.photos/id/503/1366/300.jpg)',}}>For Sale</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className={classes.button} style={{backgroundImage: 'url(https://i.picsum.photos/id/504/1366/300.jpg)',}}>Courses</Button>
                </Grid>    
              </Grid>
              </Container>
            </React.Fragment>
        );
}