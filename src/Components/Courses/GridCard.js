import React from 'react'
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {RED,WHITE} from '../../Constants';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {coursedata} from "../../Actions";
import Typography from '@material-ui/core/Typography';

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
  const [value, setValue] = React.useState(0);
  
  const dispatch = useDispatch();

  const handleCourse = () => {
      dispatch(coursedata(card_data));
  };

  const header = 
  <div style={{position: 'relative'}}>
    <div style={{width: '100%'}}>
      <img  alt="Card" src={card_data.course_pic} width="100%"/>
    </div>
    <Rating
          name="read-only"
          value={value}
          readOnly
        />
        <div style={{height: '60px', overflow: 'hidden'}}>
          <Typography variant="h5">{card_data.title}</Typography>
        </div>
  </div>

  const footer = <span>
                <Link to='/EnrollCourse'>
                  <Button label={"Enroll"} icon="pi pi-check" onClick={handleCourse} style={{marginRight: '.25em'}}/>
                </Link>
               </span>;
  
  
  return (
      <div style={{ padding: '.5em' }} className="p-col-12 p-xs-12 p-sm-6 p-md-4 p-lg-3">
        <Card className={classes.cardstyle} header={header} footer={footer} subTitle={"Course Price: Rs. "+card_data.price} style={{padding:'10px'}}>
        </Card>   
      </div>
  );
}