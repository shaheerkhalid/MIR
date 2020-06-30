import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import AddProduct1 from '../Components/AddProduct/AddProduct';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

export default function AddProduct() {
    
    const classes = useStyles();
    const [catlist, setcatlist] = React.useState("");
    const [brandlist, setbrandlist] = React.useState("");
    const jsontoken = useSelector(state => state.jsontoken);

    React.useEffect(() => {
        const fetchCategory = () => {
            return fetch('http://localhost:5000/Api/Category',  {
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
        const fetchBrand = () => {
            return fetch('http://localhost:5000/Api/Brand',  {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' ,
                            'Authorization': jsontoken
                        }
                    })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.success===1){
                    setbrandlist(response.data);
                }
            });
        }
        fetchCategory();
        fetchBrand();
    }, [jsontoken]);

    return(
        (brandlist!==""&&catlist!=="")?
        <div>
            <Navbar/>
            <AddProduct1 catlist={catlist} brandlist={brandlist}/>
            <Footer/>
        </div>:<div>
                    <Backdrop className={classes.backdrop} open>
                        <CircularProgress color="primary" />
                    </Backdrop>
                </div>
    );
} 