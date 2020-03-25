import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from './Containers/Homepage';
import Signup from './Containers/Signup';
import Login from './Containers/Login';
// import Products from './Containers/Products';
import Admin from './Containers/AdminPanel';


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
                   <Route path="/Admin" exact>
                        <Admin/>
                   </Route>
                   <Route path="/Admin/Listing" exact>
                        <Admin/>
                   </Route>
                   <Route path="/Admin/RentingProduct" exact>
                        <Admin/>
                   </Route>
                   <Route path="/Admin/History" exact>
                        <Admin/>
                   </Route>
                   <Route path="/Admin/EnrolledCourse" exact>
                        <Admin/>
                   </Route>
                   <Route path="/Admin/Account" exact>
                        <Admin/>
                   </Route>
               </Switch>
           </Router>
        </div>
    );
}