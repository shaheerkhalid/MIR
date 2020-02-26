import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ProductListing from './Components/Products/ProductListing';

export default function Home() {
    return(
        <div>
            <Navbar/>
            <ProductListing/>
            <Footer/>
        </div>    
    );
} 