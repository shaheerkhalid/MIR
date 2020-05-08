import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProductListing from '../Components/Products/ProductListing';
import {useSelector} from 'react-redux';
import {prodlist} from "../Actions";
import {useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default function Products() {
    const classes = useStyles();
    const [catlist, setcatlist] = React.useState("");
    const jsontoken = useSelector(state => state.jsontoken);
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
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
        // }
    }, [jsontoken,dispatch]);

    return(
        (catlist!==""&&prodlist!=="")?
        <div>
            <Navbar/>
            <ProductListing catlist={catlist}/>
            <Footer/>
        </div>:<div>
                    <Backdrop className={classes.backdrop} open>
                        <CircularProgress color="primary" />
                    </Backdrop>
                </div> 
    );
} 