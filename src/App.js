import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import Home from './Containers/Homepage';
import Signup from './Containers/Signup';
import Login from './Containers/Login';
import Products from './Containers/Products';
import Userdashboard from './Containers/Userdashboard';
import About from './Containers/About';
import Contact from './Containers/Contact';
import AddProduct from './Containers/AddProduct';
import ProductView from './Containers/ProductView';
import ProfileView from './Containers/ProfileView';
import Payment from './Containers/Payment';
import AddInstructor from './Containers/AddInstructor';
import {useSelector} from 'react-redux';

export default function App(){

      const isLogged = useSelector(state => state.isLogged);

    return(
        <div>
           <Router>
               <Switch>
                   <Route path="/" exact>
                        <Home/>
                   </Route>
                   <Route path="/Signup" exact>
                        {isLogged ? <Redirect to="/Login" /> : <Signup />}
                   </Route>
                   <Route path="/Login" exact>
                        {isLogged ? <Redirect to="/" /> : <Login />}
                   </Route>
                   <Route path="/Dashboard" exact>
                        {isLogged ? <Userdashboard/>: <Redirect to="/" />}
                   </Route>
                   <Route path="/Dashboard/EditProfile" exact>
                        {isLogged ? <Userdashboard/>: <Redirect to="/" />}
                   </Route>
                   <Route path="/Payment" exact>
                         {isLogged ? <Payment/>: <Redirect to="/Login" />}
                   </Route>
                   <Route path="/Contact" exact>
                        <Contact/>
                   </Route>
                   <Route path="/About" exact>
                         <About/>
                   </Route>
                   <Route path="/AddProduct" exact>
                        {isLogged ? <AddProduct/>: <Redirect to="/Login" />}
                   </Route>
                   <Route path="/Products" exact>
                         <Products/>
                   </Route>
                   <Route path="/ProductView" exact>
                         <ProductView/>
                   </Route>
                   <Route path="/ProfileView" exact>
                         <ProfileView/>
                   </Route>
                   <Route path="/Dashboard/Listing" exact>
                        {isLogged ? <Userdashboard/>: <Redirect to="/" />}
                   </Route>
                   <Route path="/Dashboard/RenterHistory" exact>
                        {isLogged ? <Userdashboard/>: <Redirect to="/" />}
                   </Route>
                   <Route path="/Dashboard/RenteeHistory" exact>
                        {isLogged ? <Userdashboard/>: <Redirect to="/" />}
                   </Route>
                   <Route path="/Dashboard/SellerHistory" exact>
                        {isLogged ? <Userdashboard/>: <Redirect to="/" />}
                   </Route>
                   <Route path="/Dashboard/BuyerHistory" exact>
                        {isLogged ? <Userdashboard/>: <Redirect to="/" />}
                   </Route>
                   <Route path="/Dashboard/Account" exact>
                        {isLogged ? <Userdashboard/>: <Redirect to="/" />}
                   </Route>
                   <Route path="/AddInstructor" exact>
                        <AddInstructor/>
                   </Route>
               </Switch>
           </Router>
        </div>
    );
}