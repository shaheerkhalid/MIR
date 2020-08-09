import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CourseDetails from '../Components/EnrollCourse/CourseDetails';

export default function EnrollCourse() {
    React.useEffect(() => {
        window.scrollTo(0, 0)
    })
    return(
        <div>
            <Navbar/>
            <CourseDetails/>
            <Footer/>
        </div>    
    );
} 