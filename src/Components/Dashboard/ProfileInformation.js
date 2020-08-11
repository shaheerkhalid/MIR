import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { useSelector } from 'react-redux';
import {WHITE} from '../../Constants';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  container: {
    padding: '20px',
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

export default function ProfileInformation() {
  const classes = useStyles();
  const userdata = useSelector(state => state.userid);
  const userlist = useSelector(state => state.userlist);
  
  const [reviews, setreviews] = React.useState("");
  const [ratings, setratings] = React.useState("");

  React.useEffect(()=>{
        fetch(`http://localhost:5000/Api/USER/GetRating/${userdata.user_id}`,  {
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
        fetch(`http://localhost:5000/Api/USER/GetReviews/${userdata.user_id}`,  {
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
  },[]);

  return (
    (ratings!==""&&reviews!=="")?
    <div className={classes.root}>
            <Grid container spacing={3} style={{marginTop:'25px',marginBottom:'25px'}}>
                <Grid item xs={12} sm={6} justify="center">
                    <Avatar alt={userdata.full_name} src={userdata.avatar} className={classes.large} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography style={{marginTop: '10px'}} variant="h5">Name: <span style={{fontSize: '16px'}}>{userdata.full_name}</span></Typography>
                    <Typography variant="h6">Email Address: <span style={{fontSize: '16px'}}>{userdata.email}</span></Typography>
                    <Typography variant="h6">Phone: <span style={{fontSize: '16px'}}>{userdata.phone}</span></Typography>
                    <Typography variant="h6">Address: <span style={{fontSize: '16px'}}>{userdata.address}</span></Typography> 
                    
                    <Typography variant="h6">About: </Typography>
                    <span >&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                      {userdata.about}    
                    </span>
                    <Typography variant="h6">Rating: &nbsp;
                    <Rating
                        name="read-only"
                        value= {ratings.rating}
                        readOnly
                        />
                    </Typography>
                    <Link id="editprofile" to="/Dashboard/EditProfile"></Link>
                    <br></br>
                    <br></br>
                    <Button onClick={()=>{document.getElementById('editprofile').click()}}  style={{backgroundColor: WHITE,fontSize: '16px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Edit Profile</Button>
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
    </div>:<div></div>
  );
}