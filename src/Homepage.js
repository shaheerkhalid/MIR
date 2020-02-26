import React from 'react';
import Header from './Components/Homepage/Header';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Info from './Components/Homepage/Info';
import ProductList from './Components/Homepage/ProductList';
import BrowseGrid from './Components/Homepage/BrowseGrid';


export default function Home() {
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