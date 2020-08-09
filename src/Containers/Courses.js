import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CourseListing from '../Components/Courses/CourseListing';
import {courselist} from "../Actions";
import {useDispatch,useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default function Courses() {
    const classes = useStyles();
    const [catlist, setcatlist] = React.useState("");
    const [courseList, setcourseList] = React.useState("");
    const jsontoken = useSelector(state => state.jsontoken);
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
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
                        setcourseList(response.data);
                        fetch('http://localhost:5000/Api/Category',  {
                            method: 'GET',
                            headers: { 'Content-Type': 'application/json' ,
                                        'Authorization': jsontoken
                                    }
                                })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response.success===1){
                                setcatlist(response.data);
                            }
                        });
                    }
                });
    }, [jsontoken,dispatch]);

    return(
        (catlist!=="" && courseList!=="")?
        <div>
            <Navbar/>
            <CourseListing catlist={catlist}/>
            <Footer/>
        </div>:<div>
                    <Backdrop className={classes.backdrop} open>
                        <CircularProgress color="primary" />
                    </Backdrop>
                </div> 
    );
} 