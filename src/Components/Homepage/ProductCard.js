import React from 'react'
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {RED,WHITE} from '../../Constants';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {proddata} from "../../Actions";
import Typography from '@material-ui/core/Typography';

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
  const [ratings, setratings] = React.useState({rating:0});
  
  React.useEffect(() => {
    fetch(`http://localhost:5000/Api/Product/GetRating/${card_data.product_id}`,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'
                }
            })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
          if(response.success===1){
              setratings(response.data[0]);
          }
      });  
  }, [ratings]);
  
  const dispatch = useDispatch();

  const handleRent = () => {
      dispatch(proddata(card_data));
  };

  const header = 
  <div style={{position: 'relative'}}>
    <div style={{width: '100%'}}>
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
          value={ratings.rating}
          readOnly
        />
        <div style={{height: '60px', overflow: 'hidden'}}>
          <Typography variant="h5">{card_data.title}</Typography>
        </div>
  </div>

  const footer = <span>
                <Link to='/ProductView'>
                  <Button label={(card_data.product_type==="rent")?"Rent":"Buy"} icon="pi pi-check" onClick={handleRent} style={{marginRight: '.25em'}}/>
                </Link>
               </span>;
  
  
  return (
        <Card className={classes.cardstyle} header={header} footer={footer} subTitle={"Net Worth: Rs. "+card_data.actual_price} style={{padding:'10px'}}>
        </Card>   
  );
}