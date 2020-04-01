import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from './Containers/Homepage';
import Signup from './Containers/Signup';
import Login from './Containers/Login';
import Products from './Containers/Products';
import Userdashboard from './Containers/Userdashboard';
import About from './Containers/About';
import Contact from './Containers/Contact';
import AddProduct from './Containers/AddProduct';

export default function App(){
    return(
        <div>
           <Router>
               <Switch>
                   <Route path="/" exact>
                        <Signup/>
                   </Route>
                   <Route path="/Login" exact>
                        <Login/>
                   </Route>
                   <Route path="/Home" exact>
                        <Home/>
                   </Route>
                   <Route path="/Dashboard" exact>
                        <Userdashboard/>
                   </Route>
                   <Route path="/Contact" exact>
                        <Contact/>
                   </Route>
                   <Route path="/About" exact>
                         <About/>
                   </Route>
                   <Route path="/AddProduct" exact>
                         <AddProduct/>
                   </Route>
                   <Route path="/Products" exact>
                         <Products/>
                   </Route>
                   <Route path="/Dashboard/Listing" exact>
                         <Userdashboard/>
                   </Route>
                   <Route path="/Dashboard/RentingProduct" exact>
                         <Userdashboard/>
                   </Route>
                   <Route path="/Dashboard/History" exact>
                         <Userdashboard/>
                   </Route>
                   <Route path="/Dashboard/EnrolledCourse" exact>
                         <Userdashboard/>
                   </Route>
                   <Route path="/Dashboard/Account" exact>
                         <Userdashboard/>
                   </Route>
               </Switch>
           </Router>
        </div>
    );
}