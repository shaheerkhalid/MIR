import React from 'react';
import Header from './Components/Header';
import Navbar from './Components/BNavbar';
import Footer from './Components/Footer';
import Info from './Components/Info';
import BrowseGrid from './Components/BrowseGrid';

export default function Home() {
    return(
        <div>
            <Navbar/>
            <Header/>
            <Info/>
            <BrowseGrid/>
            <Footer/>
        </div>    
    );
} 