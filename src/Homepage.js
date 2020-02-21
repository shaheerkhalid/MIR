import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/BNavbar';
import Footer from './Components/Footer';
import Product from './Components/ProductList';

export default function Home() {
    return(
        <div>
            <Navbar/>
            <Header/>
            <Product/>
            <Footer/>

        </div>    
    );
} 