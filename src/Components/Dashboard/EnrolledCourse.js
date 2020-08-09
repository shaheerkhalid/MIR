import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Button from "@material-ui/core/Button";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useSelector,useDispatch} from 'react-redux';
import {courselist,coursedata} from "../../Actions";
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';

const columns = [
  { id: 'title', label: 'Title', minWidth: 150},
  { id: 'enroll_date', label: 'Enroll Date', minWidth: 150},
  { id: 'price', label: 'Net Price (Rs)', minWidth: 150},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});



export default function EnrolledCourses() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [allcourses, setAllCourses] = React.useState(""); 
  const jsontoken = useSelector(state => state.jsontoken);
  const user = useSelector(state => state.userid);
  // const edit = useSelector(state => state.editprod);

  const [courseId, setcourseId] = React.useState();
  const [instructorId, setInstructorId] = React.useState();

  const [instructorRating, setInstructorRating] = React.useState(0);
  const [instructorReview, setInstructorReivew] = React.useState("");
  const [courseRating, setCourseRating] = React.useState(0);
  const [courseReview, setCourseReivew] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(()=>{
    fetch(`http://localhost:5000/Api/Course/EnrolledCourse/${user.user_id}`,  {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' ,
                                'Authorization': jsontoken
                            }
                    })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                  if(response.success===1){
                        setAllCourses(response.data);
                  }
    });
  },[]);

  let rows = allcourses;
  
  const dispatch = useDispatch();
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    (rows !== "")?
    <div>
      <br></br>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
                <TableCell
                  key="action"
                  style={{ minWidth: 180 }}
                >
                  Actions
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell key="action" align="300">
                        {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                        <Link id="courselink" to="/Dashboard/CourseDetails" ></Link>
                        <Button size="small"  color="primary" variant="contained" onClick={()=>{
                            dispatch(coursedata(rows.filter(course => course.course_id === row.course_id)[0]));
                            document.getElementById('courselink').click();
                        }}>View</Button> <Button size="small" color="secondary" variant="contained" onClick={()=>{
                            setcourseId(row.course_id);
                            setInstructorId(row.instructor_id);
                            handleClickOpen();
                          }}> Review</Button>

                      </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Review and Rate Instructor Profile and Course</DialogTitle>
        <DialogContent>
        <Typography>Select Instructor's Rating</Typography>
          <Rating
            value={instructorRating}
            onChange={(event, newValue) => {
              setInstructorRating(newValue);
            }}
          />
          <br></br>
          <TextField
            variant="outlined"
            label="Enter Instructor's Review"
            type="text"
            value={instructorReview}
            onChange={(e)=>{
              setInstructorReivew(e.target.value);
            }}
            fullWidth
          />
          <Typography>Select Course Rating</Typography>
          <Rating
            value={courseRating}
            onChange={(event, newValue) => {
              setCourseRating(newValue);
            }}
          />
          <br></br>
          <TextField
            variant="outlined"
            label="Enter Course Review"
            type="text"
            value={courseReview}
            onChange={(e)=>{
              setCourseReivew(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
                fetch(`http://localhost:5000/Api/Course/CourseReview`,  {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' ,
                            'Authorization': jsontoken
                        },
                body: JSON.stringify({
                    "courseid":courseId,
                    "reviewerid":user.user_id,
                    "rating":courseRating,
                    "comment":courseReview,
                    "dateadded": new Date(),
                })  
                    })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if(response.success===1){
                    fetch(`http://localhost:5000/Api/Course/UserId/${instructorId}`,  {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' ,
                                    'Authorization': jsontoken
                                }
                            })
                    .then(res => res.json())
                    .catch(error => console.error('Error:', error))
                    .then(response => {
                        if(response.success===1){
                            fetch(`http://localhost:5000/Api/User/ProfileReview`,  {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' ,
                                            'Authorization': jsontoken
                                        },
                                body: JSON.stringify({
                                    "userid":response.data[0].user_id,
                                    "reviewerid":user.user_id,
                                    "rating":instructorRating,
                                    "comment":instructorReview,
                                    "dateadded": new Date(),
                                })  
                                    })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    if(response.success===1){
                                        setInstructorRating(0);
                                        setInstructorReivew("");
                                        setCourseRating(0);
                                        setCourseReivew("");
                                        handleClose();
                                    }
                                });
                        }
                    });  
                    }
                });
            }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>:<div></div>
  );
}
