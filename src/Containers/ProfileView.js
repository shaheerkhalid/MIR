import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ViewProfile from '../Components/ViewProfile/ProfileView';

export default function ProfileView() {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    })
    return(
        <div>
            <Navbar/>
            <ViewProfile/>
            <Footer/>
        </div>    
    );
} 