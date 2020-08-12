import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function CourseDetails() {
  const classes = useStyles();
  const coursedata = useSelector(state => state.coursedata);
  const userdata = useSelector(state => state.userid);
  const jsontoken = useSelector(state => state.jsontoken);
  const [title, settitle] = React.useState("");
  const [videofile, setvideofile] = React.useState("");
  const [filename, setfilename] = React.useState("");
  const [open, setOpen] = React.useState(false);
  
  const [open1, setOpen1] = React.useState(false);
  const [lessid, setlessid] = React.useState("");

  const [videos, setvideos] = React.useState("");

  const userlist = useSelector(state => state.userlist);
  
  const [reviews, setreviews] = React.useState("");
  const [ratings, setratings] = React.useState("");

  React.useEffect(() => {
    fetch(`http://localhost:5000/Api/Course/LessonByCourseId/${coursedata.course_id}`,  {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' ,
                      'Authorization': jsontoken
                  }
              })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
          if(response.success===1){
            setvideos(response.data);
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
  }, []);
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  }

  const handleClose1 = () => {
    setOpen1(false);
  };

  const newVideo = e => {
    setvideofile(e.target.files[0]);
    setfilename(e.target.files[0].name);
    }

  return (
    (ratings!==""&&reviews!=="")?
    <div className={classes.root}>
            <form id="myform">

            </form>
            <Grid container spacing={3} style={{marginTop:'20px',marginBottom:'20px'}}>
                <Grid item xs={12} sm={4} style={{display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
                    <Avatar alt={""} src={coursedata.course_pic} className={classes.large} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography style={{marginTop: '10px'}} variant="h5">Title: <span style={{fontSize: '16px'}}>{coursedata.title}</span></Typography>
                    <Typography variant="h6">Description: <span style={{fontSize: '16px'}}>{coursedata.description}</span></Typography>
                    
                    <Typography variant="h6">Rating: &nbsp;
                    <Rating
                        name="read-only"
                        value= {ratings.rating}
                        readOnly
                        />
                    </Typography>
                    {(userdata.user_type==="instructor"||userdata.user_type==="admin")?(userdata.instructor_id===coursedata.instructor_id)?<Button style={{width: '150px'}} variant="contained" component="label" onClick={handleClickOpen}>Add Lesson</Button>:null:null}
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={0} style={{width: '100%',padding: '5px',backgroundColor:WHITE}}><Typography variant='h5' style={{color: 'grey'}}>Video Lessons: </Typography></Paper>
                </Grid>
                <Grid item xs={12}>
                  <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',}}>
                    {(videos[0])?videos.map(vid =>
                      <div style={{padding: '0px 15px 0px 15px'}}> 
                        <video width={200} height={150} controls>
                          <source src={vid.video_file_name} type="video/mp4" />
                        </video>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between',width: '200px'}}>
                          <p style={{fontSize: '16px', fontWeight: 'bold'}}>{vid.title}</p>
                          <Button style={{height:'22px', fontSize: '11px'}} size="small" color="secondary" variant="contained" onClick={()=>{
                            setlessid(vid.lesson_id);
                            setOpen1(true)
                          }}>Delete</Button>
                        </div>
                      </div>
                    ):<div><span>There is no video lesson in this course!</span></div>}
                  </div>
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
            <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Lesson Details</DialogTitle>
        <DialogContent style={{minWidth: '500px'}}>
          <TextField
            variant="outlined"
            label="Enter Title"
            type="text"
            value={title}
            onChange={(e)=>{
              settitle(e.target.value);
            }}
            fullWidth
          />
          <br></br>
          <br></br>
          <Button style={{width: '150px'}} variant="contained" component="label" >Upload Video<input type='file' accept='video/*' style={{display: 'none'}} onChange={newVideo}/></Button>
          {(filename!=="")&&<span style={{fontSize: '16px'}}>  Selected File: {filename}</span>}
          <br></br>
          <br></br>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
              var form = document.getElementById("myform");
              var formData = new FormData(form);
              formData.append('video', videofile);
              if(formData!==null){
                fetch('http://localhost:5000/videoUpload',{
                  method: 'POST',
                  body: formData
                })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                      if(response.success===1){
                        fetch('http://localhost:5000/Api/Course/AddLesson',{
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json',
                                        'Authorization': jsontoken,
                                    },
                                    body: JSON.stringify(
                                      {
                                        "title":title,
                                        "status":1,
                                        "dateadded": new Date(),
                                        "videofilename":response.video_url,
                                        "courseid":coursedata.course_id
                                      }
                                    )
                                })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response.success===1){ 
                              fetch(`http://localhost:5000/Api/Course/LessonByCourseId/${coursedata.course_id}`,  {
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json' ,
                                                'Authorization': jsontoken
                                            }
                                        })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    if(response.success===1){
                                      setvideos(response.data);
                                      settitle("");
                                      setvideofile("");
                                      setfilename("");
                                    }
                              })
                              setOpen(false);
                            }
                        });
                      }
                });
              }
          }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    <div>
      <Dialog open={open1} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Do you really want to delete this video?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
              fetch(`http://localhost:5000/Api/Course/ByLessonID`,  {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' ,
                            'Authorization': jsontoken
                        },
                body: JSON.stringify({
                  "status":0,
                  "lessonid":lessid,
                })  
                    })
              
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.success===1){
                  fetch(`http://localhost:5000/Api/Course/LessonByCourseId/${coursedata.course_id}`,  {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' ,
                                    'Authorization': jsontoken
                                }
                            })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        if(response.success===1){
                          setvideos(response.data);
                          handleClose1();
                        }
                  });
                }
            });
          }} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>:<div></div>
  );
}