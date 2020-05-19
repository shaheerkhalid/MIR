import React from 'react';
import {Carousel} from 'primereact/carousel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PCard from './ProductCard';
import data from '../../Assets/MOCK_DATA.json';
import {Grid , Typography} from '@material-ui/core';
import { makeStyles} from "@material-ui/core/styles";
import {useSelector} from 'react-redux';

const useStyles = makeStyles(theme => ({
    heading: {
      textAlign: "center",
      color: theme.palette.text.secondary,
    }
  }));


export default function ProductList() {
    const responsiveOptions = [
        {
            breakpoint: '1966px',
            numVisible: 4,
            numScroll: 1,
        },
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        }
    ];
    
    function dataTemplate(card_data){
        return <PCard card_data={card_data}/>
    }
    const classes = useStyles();

    const proddata = useSelector(state => state.prodlist);
    console.log(proddata);
    
    const prodlist = proddata.slice(0,10);

    return (
        <React.Fragment>
          <CssBaseline />
            <Container maxWidth="xl" style={{ }} >
                <Grid item xs={12} className={classes.heading}>
                        <Typography variant='h3'>You Say You Want a Revolution?</Typography>
                        <br></br>
                </Grid>
                <Carousel value={prodlist} itemTemplate={dataTemplate} autoplayInterval={3000} circular={true} responsiveOptions={responsiveOptions}></Carousel>
            </Container>
        </React.Fragment>
            
    );
};
