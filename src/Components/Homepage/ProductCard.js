import React from 'react'
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {RED,WHITE} from '../../Constants';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {proddata} from "../../Actions";

const useStyles = makeStyles(theme => ({
  cardstyle: {
    borderRadius: '5px',
    margin: '15px',
    '&:hover': {
      boxShadow: '0px 0px 10px 5px grey',
      opacity: '0.8'
      }
  },
}));

export default function ProductCard({card_data}){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  const dispatch = useDispatch();

  const handleRent = () => {
      dispatch(proddata(card_data));
  };

  const header = 
  <div style={{position: 'relative'}}>
    <div style={{width: '100%',height: '200px',overflow: 'hidden'}}>
      <img  alt="Card" src={card_data.picture_file_name} width="100%"/>
    </div>
      <label style={{
          position: 'absolute',
          top:'5px',
          left:'5px',
          backgroundColor:RED,
          color:WHITE ,
          fontWeight:'bold',
          padding:'2px 10px',
          }}>Rs. {(card_data.product_type==="rent")?card_data.price_per_day +"/Day":card_data.actual_price}</label>
          <Rating
          name="read-only"
          value={value}
          readOnly
        />
  </div>

  const footer = <span>
                <Link to='/ProductView'>
                  <Button label={(card_data.product_type==="rent")?"Rent":"Buy"} icon="pi pi-check" onClick={handleRent} style={{marginRight: '.25em'}}/>
                </Link>
               </span>;
  
  
  return (
        <Card className={classes.cardstyle} header={header} footer={footer} title={card_data.title} subTitle={"Net Worth: Rs. "+card_data.actual_price} style={{padding:'10px'}}>
        </Card>   
  );
}