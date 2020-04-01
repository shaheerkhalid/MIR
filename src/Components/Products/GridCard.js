import React from 'react'
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {RED,WHITE} from '../../Constants';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardstyle: {
    borderRadius: '5px',
    '&:hover': {
      boxShadow: '0px 0px 10px 5px grey',
      opacity: '0.8'
      }
  },
}));

export default function ProductCard({card_data}){
  const classes = useStyles();
  const [value, setValue] = React.useState(card_data.id%6);
  
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
          <Rating
          name="read-only"
          value={value}
          readOnly
        />
  </div>

  const footer = <span>
                  <Button label="Buy" icon="pi pi-check" style={{marginRight: '.25em'}}/>
               </span>;
  
  
  return (
      <div style={{ padding: '.5em' }} className="p-col-12 p-xs-12 p-sm-6 p-md-4 p-lg-3">
        <Card className={classes.cardstyle} header={header} footer={footer} title={card_data.title} subTitle={card_data.description} style={{padding:'10px'}}>
        </Card>   
      </div>
  );
}