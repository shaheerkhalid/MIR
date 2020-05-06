import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ViewProduct from '../Components/ViewProduct/ProductView';

export default function ProductView() {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    })
    return(
        <div>
            <Navbar/>
            <ViewProduct/>
            <Footer/>
        </div>    
    );
} 