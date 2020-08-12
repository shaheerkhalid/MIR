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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useSelector,useDispatch} from 'react-redux';
import {courselist,coursedata} from "../../Actions";
import {Link} from 'react-router-dom';

const columns = [
  { id: 'title', label: 'Title', minWidth: 150},
  { id: 'date_added', label: 'Date', minWidth: 150},
  { id: 'price', label: 'Net Price (Rs)', minWidth: 150},
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});



export default function Courses() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const allcourses = useSelector(state => state.courselist);
  const jsontoken = useSelector(state => state.jsontoken);
  const user = useSelector(state => state.userid);
  
  const [open, setOpen] = React.useState(false);
  const [courseID, setcourseID] = React.useState("");

  let rows = allcourses.filter(course => user.instructor_id === course.instructor_id);
  
  const dispatch = useDispatch();
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    (rows !== null)?
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
                          setcourseID(row.course_id);
                          setOpen(true);
                          }}> Delete</Button>

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
        <DialogTitle id="form-dialog-title">Do you really want to delete this item?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{
              fetch(`http://localhost:5000/Api/Course/ByCourseID`,  {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' ,
                            'Authorization': jsontoken
                        },
                body: JSON.stringify({
                  "status":0,
                  "courseid":courseID
                })  
                    })
              
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.success===1){
                  fetch('http://localhost:5000/Api/Course',  {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' ,
                                'Authorization': jsontoken
                            }
                        })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if(response.success===1){
                        dispatch(courselist(response.data));
                        setOpen(false);
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
