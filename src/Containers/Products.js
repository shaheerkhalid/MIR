import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ProductListing from '../Components/Products/ProductListing';

export default function Home() {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    })
    return(
        <div>
            <Navbar/>
            <ProductListing/>
            <Footer/>
        </div>    
    );
} 