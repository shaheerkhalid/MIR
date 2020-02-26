import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CategoryList1 from './CategoryList1';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    category1: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'block',
        },
    },
    category2: {
        display: 'block',
        borderRight: '1px solid lightgrey',
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        },
    },
  }));


export default function ProductListing() {

    const classes = useStyles();
    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl" style={{ padding: '50px' }} >
          <Grid container spacing={3}>
            <Grid className={classes.category1} item xs={12}>
                    <CategoryList1/>
                    <hr></hr>
            </Grid>
            <Grid className={classes.category2} item xs={2}>
            <Typography variant='h5'>Categories</Typography>
                    <Typography>
                        <Link href="#">Link1</Link><br></br>
                        <Link href="#">Link1</Link><br></br>
                        <Link href="#">Link1</Link><br></br>
                        <Link href="#">Link1</Link><br></br>
                        <Link href="#">Link1</Link><br></br>
                    </Typography>
            </Grid>
            <Grid item xs={10}>
                    hdsaghdg
            </Grid>    
          </Grid>
          </Container>
        </React.Fragment>
    );
}