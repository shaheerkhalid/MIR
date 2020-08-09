import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { useSelector } from 'react-redux';
import {WHITE, RED} from '../../Constants';
import Stripecheckout from 'react-stripe-checkout';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  container: {
    padding: '20px',
  },
  large: {
    width: theme.spacing(),
    height: theme.spacing(20),
  },
}));

export default function CourseDetails() {
  const classes = useStyles();
  const coursedata = useSelector(state => state.coursedata);
  const userdata = useSelector(state => state.userid);
  const jsontoken = useSelector(state => state.jsontoken);
  const [totalVideos, setTotalVideos] = React.useState("0");
  const REACT_APP_KEY = 'pk_test_bRO4OuFREqnyEMhkj49RKOZr00nUr3TiNj';

  React.useEffect(()=>{
    fetch(`http://localhost:5000/Api/Course/TotalVideos/${coursedata.course_id}`,  {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'
                  }
              })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
          if(response.success===1){
              setTotalVideos(response.data[0].totalVideos);
          }
      });
},[]);


const makePayment = token => {
    const body = {
      token,
      instrument: coursedata,
      amount: (coursedata.price)
    }
    
    const headers = {
      "Content-Type": "application/json"
    }

    return fetch(`http://localhost:5000/payment`,{
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(response => {
      console.log(response)
    
      const data = {
        "studentid": userdata.user_id,
        "courseid": coursedata.course_id,
        "dateadded": new Date()
      }
      fetch('http://localhost:5000/Api/Course/EnrollCourse',  {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' ,
                              'Authorization': jsontoken
                          },
                  body: JSON.stringify(data)
                      })
              .then(res => res.json())
              .catch(error => console.error('Error:', error))
              .then(response => {

              });


    }).catch(err => console.log(err))

  }

  return (
    <div className={classes.root}>
            <Grid container justify="center" style={{marginTop:'20px'}}>
                <Grid item xs={12} md={10}>
                    <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={0} style={{width: '100%',padding: '20px',backgroundColor:WHITE}}><Typography variant='h5' style={{color: 'grey'}}>Course View</Typography></Paper>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
                    <Paper className={classes.paper}>
                        <img alt="" src={coursedata.course_pic} width="100%"/>
                    </Paper>
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography style={{marginTop: '10px'}} variant="h5">Title: <span style={{fontSize: '16px'}}>{coursedata.title}</span></Typography>
                        <Typography variant="h6">Description: <span style={{fontSize: '16px'}}>{coursedata.description}</span></Typography>
                        
                        <Typography variant="h6">Rating: &nbsp;
                        <Rating
                            name="read-only"
                            value= {0}
                            readOnly
                            />
                        </Typography>
                        <Typography variant="h6">Total Number of Videos: <span style={{fontSize: '16px'}}>{totalVideos}</span></Typography>
                        <Typography variant="h6">Price: <span style={{fontSize: '16px'}}>{coursedata.price}</span></Typography>
                        <br></br>
                        <br></br>
                        {(userdata.user_type==="instructor"||userdata.user_type==="admin")?(coursedata.instructor_id===userdata.instructor_id)?"You can't enroll your own course!":
                            <Stripecheckout
                            stripeKey={REACT_APP_KEY}
                            token={makePayment}
                            name="Pay with Card"
                            currency="PKR"
                            locale='pk'
                            amount={coursedata.price}
                          >
                            <Button underline='none' style={{backgroundColor: RED,color: WHITE,fontWeight: '700',padding: '15px 30px'}}>Eroll Course</Button>  
                            </Stripecheckout>:
                            <Stripecheckout
                            stripeKey={REACT_APP_KEY}
                            token={makePayment}
                            name="Pay with Card"
                            currency="PKR"
                            locale='pk'
                            amount={coursedata.price}
                          >
                            <Button underline='none' style={{backgroundColor: RED,color: WHITE,fontWeight: '700',padding: '15px 30px'}}>Eroll Course</Button>  
                            </Stripecheckout>
                            }
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={0} style={{width: '100%',padding: '5px',backgroundColor:WHITE}}><Typography variant='h5' style={{color: 'grey'}}>Reviews: </Typography></Paper>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
    </div>
  );
}