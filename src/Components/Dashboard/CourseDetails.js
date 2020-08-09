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

  const [videos, setvideos] = React.useState("");

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
    })
  }, []);
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const newVideo = e => {
    setvideofile(e.target.files[0]);
    setfilename(e.target.files[0].name);
    }

  return (
    <div className={classes.root}>
            <form id="myform">

            </form>
            <Grid container spacing={3} style={{marginTop:'20px'}}>
                <Grid item xs={12} sm={4} justify="center" style={{display: 'flex',flexDirection: 'row',justifyContent: 'center'}}>
                    <Avatar alt={""} src={coursedata.course_pic} className={classes.large} />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <Typography style={{marginTop: '10px'}} variant="h5">Title: <span style={{fontSize: '16px'}}>{coursedata.title}</span></Typography>
                    <Typography variant="h6">Description: <span style={{fontSize: '16px'}}>{coursedata.description}</span></Typography>
                    
                    <Typography variant="h6">Rating: &nbsp;
                    <Rating
                        name="read-only"
                        value= {0}
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
                    {(videos!=="")?videos.map(vid =>
                      <div style={{padding: '0px 15px 0px 15px'}}> 
                        <video width={200} height={150} controls>
                          <source src={vid.video_file_name} type="video/mp4" />
                        </video>
                        <p style={{fontSize: '16px'}}>{vid.title}</p>
                      </div>
                    ):null}
                  </div>
                </Grid>
                <Grid item xs={12}>
                    <Paper elevation={0} style={{width: '100%',padding: '5px',backgroundColor:WHITE}}><Typography variant='h5' style={{color: 'grey'}}>Reviews: </Typography></Paper>
                </Grid>
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
    </div>
  );
}