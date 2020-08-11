import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { useSelector, useDispatch } from 'react-redux';
import {message} from '../../Actions';
import {WHITE, RED} from '../../Constants';
import Stripecheckout from 'react-stripe-checkout';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const isLogged = useSelector(state => state.isLogged);
  const [totalVideos, setTotalVideos] = React.useState("0");
  const REACT_APP_KEY = 'pk_test_bRO4OuFREqnyEMhkj49RKOZr00nUr3TiNj';

  const userlist = useSelector(state => state.userlist);

  const dispatch = useDispatch();
  
  const [reviews, setreviews] = React.useState("");
  const [ratings, setratings] = React.useState("");
  const [enroll, setenroll] = React.useState("");

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
      fetch(`http://localhost:5000/Api/Course/GetRating/${coursedata.course_id}`,  {
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
    fetch(`http://localhost:5000/Api/Course/GetReviews/${coursedata.course_id}`,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'
                }
            })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if(response.success===1){
            setreviews(response.data);
        }
    });
    fetch(`http://localhost:5000/Api/Course/GetEnrolledCourse/${userdata.user_id}/${coursedata.course_id}`,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'
                }
            })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if(response.success===1){
            setenroll(response.data[0]);
        }
    });
},[coursedata.course_id,userdata.user_id]);


const makePayment = token => {
    const body = {
      token,
      instrument: coursedata,
      amount: (coursedata.price*100)
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
                dispatch(message("Course Enrolled Successfully"));
                document.getElementById('home').click();
              });


    }).catch(err => console.log(err))

  }

  return (
    (ratings!==""&&reviews!==""&&enroll!=="")?
    <div className={classes.root}>{console.log(enroll)}
            <Grid container justify="center" style={{marginTop:'20px',marginBottom:'20px'}}>
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
                            value= {ratings.rating}
                            readOnly
                            />
                        </Typography>
                        <Typography variant="h6">Total Number of Videos: <span style={{fontSize: '16px'}}>{totalVideos}</span></Typography>
                        <Typography variant="h6">Price: <span style={{fontSize: '16px'}}>{coursedata.price}</span></Typography>
                        <br></br>
                        <br></br>
                        {(userdata.user_type==="instructor"||userdata.user_type==="admin")?(coursedata.instructor_id===userdata.instructor_id&&isLogged)?"You can't enroll your own course!":
                            (enroll&&isLogged)?"You already enrolled to this course!":<Button onClick={() => {(isLogged)?document.getElementById("pay").click():document.getElementById("login").click()}} underline='none' style={{backgroundColor: RED,color: WHITE,fontWeight: '700',padding: '15px 30px'}}>Eroll Course</Button>:
                            (enroll&&isLogged)?"You already enrolled to this course!":<Button onClick={() => {(isLogged)?document.getElementById("pay").click():document.getElementById("login").click()}} underline='none' style={{backgroundColor: RED,color: WHITE,fontWeight: '700',padding: '15px 30px'}}>Eroll Course</Button>
                            }
                            <Stripecheckout
                            stripeKey={REACT_APP_KEY}
                            token={makePayment}
                            name="Pay with Card"
                            currency="PKR"
                            locale='pk'
                            amount={coursedata.price*100}
                          >
                            <Button id="pay" underline='none' style={{display: 'none'}}></Button>  
                            </Stripecheckout>
                            <Link id="login" to="/Login"></Link>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={0} style={{width: '100%',padding: '5px',backgroundColor:WHITE}}><Typography variant='h5' style={{color: 'grey'}}>Reviews: </Typography></Paper>
                    </Grid>
                    {(reviews[0])?reviews.map(review => <Grid style={{borderBottom: '1px solid grey'}} item xs={12}>
                        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between'}}>
                          <div><span style={{fontWeight: 'bold'}}>{userlist.filter(user => user.user_id === review.reviewer_id)[0].full_name}</span></div>
                          <div><span style={{fontWeight: 'bold'}}>Date: </span><span>{review.date_added}</span></div>
                        </div>
                        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between'}}>
                          <div><span>{review.comment}</span></div>
                          <div><Rating
                            name="read-only"
                            value= {review.rating}
                            readOnly
                            /></div>
                        </div>
                    </Grid>
                    ):<Grid item xs={12}>
                    <div><span>There are no reviews!</span></div>
                  </Grid>}
                    </Grid>
                </Grid>
                <Link id="home" to="/"></Link>
            </Grid>
    </div>:<div>
                    <Backdrop className={classes.backdrop} open>
                        <CircularProgress color="primary" />
                    </Backdrop>
                </div>
  );
}