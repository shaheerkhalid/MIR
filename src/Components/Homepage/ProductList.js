import React from 'react';
import {Carousel} from 'primereact/carousel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import PCard from './ProductCard';
import data from '../../Assets/MOCK_DATA.json';


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

    return (
        <React.Fragment>
          <CssBaseline />
            <Container maxWidth="xl" style={{ }} >
                <Carousel value={data} itemTemplate={dataTemplate} autoplayInterval={5000} circular={true} responsiveOptions={responsiveOptions}></Carousel>
            </Container>
        </React.Fragment>
            
    );
};
