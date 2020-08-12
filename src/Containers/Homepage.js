import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Header from '../Components/Homepage/Header';
import Info from '../Components/Homepage/Info';
import {prodlist,userlist,message,courselist} from "../Actions";
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import ProductList from '../Components/Homepage/ProductList';
import BrowseGrid from '../Components/Homepage/BrowseGrid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function Home() {
    
    const dispatch = useDispatch();
    const jsontoken = useSelector(state => state.jsontoken);
    const messagepop = useSelector(state => state.message);
    const [open, setOpen] = React.useState(messagepop!==""?true:false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(message(""));
        setOpen(false);
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
        fetch('http://localhost:5000/Api/Product',  {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' ,
                                'Authorization': jsontoken
                            }
                        })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if(response.success===1){
                        dispatch(prodlist(response.data));
                    }
        });
        fetch('http://localhost:5000/Api/User',  {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' ,
                                'Authorization': jsontoken
                            }
                        })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    if(response.success===1){
                        dispatch(userlist(response.data));
                    }
        });
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
                    }
        });
    },[]);
    
    return(
        <div>
            <Navbar/>
            <Header/>
            <Info/>
            <ProductList/>
            <BrowseGrid />
            <Footer/>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                {messagepop==="Course Added Successfully"?<Alert onClose={handleClose} severity="success">
                    Course Added Successfully
                </Alert>:messagepop==="Product Added Successfully"?<Alert onClose={handleClose} severity="success">
                    Product Added Successfully
                </Alert>:messagepop==="Product Updated Successfully"?<Alert onClose={handleClose} severity="success">
                    Product Updated Successfully
                </Alert>:messagepop==="Rented Out Successfully"?<Alert onClose={handleClose} severity="success">
                    Rented Out Successfully
                </Alert>:messagepop==="Product Buy Successfully"?<Alert onClose={handleClose} severity="success">
                    Product Buy Successfully
                </Alert>:messagepop==="You Become an Instructor Successfully"?<Alert onClose={handleClose} severity="success">
                    You Become an Instructor Successfully
                </Alert>:messagepop==="Course Enrolled Successfully"&&<Alert onClose={handleClose} severity="success">
                    Course Enrolled Successfully
                </Alert>}
            </Snackbar>
        </div>    
    );
} 