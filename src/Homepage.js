import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/Navbar;
import Footer from './Components/Footer';
import Info from './Components/Info';
import ProductList from './Components/ProductList';


export default function Home() {
    return(
        <div>
            <Navbar/>
            <Header/>
            <Info/>
            <ProductList/>
            <Footer/>

        </div>    
    );
} 