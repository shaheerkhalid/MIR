import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Grid , Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {WHITE,RED} from '../../Constants';


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
            opacity: '0.9',
            color: RED,
      }
    },
    heading: {
      textAlign: "center",
      color: theme.palette.text.secondary,
    }
  }));

export default function BrowseGrid(){
        const classes = useStyles();
    return(
            <React.Fragment>
              <CssBaseline />
              <Container className={classes.container} maxWidth="xl" style={{ padding: '50px' }} >
                <Grid container>
                <Grid item xs={12} className={classes.heading}>
                        <Typography variant='h3'>Browse By Category!</Typography>
                        <br></br>
                </Grid>
                  <Grid item xs={12}>
                    <Link className='nav-link' underline='none' to="/Products?ptype=rent">
                      <Button className={classes.button} style={{backgroundImage: 'url(http://getwallpapers.com/wallpaper/full/4/7/2/242715.jpg)',backgroundSize: '100%'}}>For Rent</Button>
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                  <Link className='nav-link' underline='none' to="/Products?ptype=sale">
                      <Button className={classes.button} style={{backgroundImage: 'url(https://fsb.zobj.net/crop.php?r=jwTkRrNS9p2QBVE6bFxjtMcIHf78RT3aw7AI0QRI26-wIn6EzYrgQCAy3j78v0CNBXUo_De2s4TGrxuoWg-caDrzSgPVSmAcs3N3AUngxVrwVuXtkbvp3O--douL9FNKaizav497IW5Q2IlP)',backgroundSize: '100%'}}>For Sale</Button>
                  </Link>
                  </Grid>
                  <Grid item xs={6}>
                  <Link className='nav-link' underline='none' to="/Courses">
                      <Button className={classes.button} style={{backgroundImage: 'url(https://i.pinimg.com/originals/db/8b/45/db8b45f4ba723634a5d78af8c67c35bc.jpg)',backgroundSize: '100%'}}>Courses</Button>
                  </Link>
                  </Grid>    
                </Grid>
                </Container>
            </React.Fragment>
        );
}