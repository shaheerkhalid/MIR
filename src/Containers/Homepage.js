import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Header from '../Components/Homepage/Header';
import Info from '../Components/Homepage/Info';
import {prodlist,userlist} from "../Actions";
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import ProductList from '../Components/Homepage/ProductList';
import BrowseGrid from '../Components/Homepage/BrowseGrid';

export default function Home() {
    
    const dispatch = useDispatch();
    const jsontoken = useSelector(state => state.jsontoken);

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
    },[]);
    
    return(
        <div>
            <Navbar/>
            <Header/>
            <Info/>
            <ProductList/>
            <BrowseGrid />
            <Footer/>
        </div>    
    );
} 