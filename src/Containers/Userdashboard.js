import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Panel from '../Components/Dashboard/PanelLayout';

export default function AdminPanel() {
    return(
        <div>
            <Navbar/>
            <Panel/>
            <Footer/>
        </div>
    );
}