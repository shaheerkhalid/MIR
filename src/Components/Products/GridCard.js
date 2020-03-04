import React from 'react'
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {RED,WHITE} from '../../Constants';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';


export default function ProductCard({card_data}){
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
  
  
  return (
      <div style={{ padding: '.5em' }} className="p-col-12 p-xs-12 p-sm-6 p-md-4 p-lg-3">
        <Card header={header} footer={footer} title={card_data.title} subTitle={card_data.description} style={{padding:'10px'}}>
          
          </Card>   
      </div>
  );
}