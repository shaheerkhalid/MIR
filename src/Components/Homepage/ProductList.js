import React from 'react';
import {Carousel} from 'primereact/carousel';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {RED,WHITE} from '../../Constants';
import data from '../../Assets/MOCK_DATA.json';

function ProductCard(card_data){
    const header = 
    <div style={{position: 'relative'}}>
        <img  alt="Card" src={'https://i.picsum.photos/id/1'+card_data.id+'/200/200.jpg'}/>
        <label style={{
            position: 'absolute',
            top:'5px',
            left:'5px',
            backgroundColor:RED,
            color:WHITE ,
            fontWeight:'bold',
            padding:'2px 10px',
            }}>{card_data.price} /Day</label>
    </div>

    const footer = <span>
                    <Button label="Buy" icon="pi pi-check" style={{marginRight: '.25em'}}/>
                 </span>;
    return(
        <Card header={header} footer={footer} title={card_data.title} subTitle={card_data.description} style={{padding:'10px'}}>
            
        </Card>
        
    );
}

export default function ProductList() {
    const responsiveOptions = [
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
    
    return (
        <div>
            <Carousel value={data} itemTemplate={ProductCard} numVisible={4} numScroll={1} autoplayInterval={2000} circular={true} responsiveOptions={responsiveOptions}></Carousel>
        </div>
    );
};
