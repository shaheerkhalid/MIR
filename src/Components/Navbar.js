import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import {RED, WHITE} from '../Constants';
import {useSelector, useDispatch} from 'react-redux';
import {isLog, jsontoken} from "../Actions";

export default function Navbar() {
    const useStyles = makeStyles(theme => ({
        navitems: {
            [theme.breakpoints.up("md")]: {
                float: 'right',
            },
        },
    }));
    const classes = useStyles();

    const isLogged = useSelector(state => state.isLogged);
    const userdata = useSelector(state => state.userid);
    const dispatch = useDispatch();

    return(
        <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor: WHITE,padding : '0px 10px 0px 0px'}}>
            <Link className="nav-link" to="/">
                <Typography className={classes.title} variant="h4" noWrap style={{color: RED , fontWeight: 'bold'}}>
                    MIRS
                </Typography>
            </Link>
            {/* <span className="navbar-brand" href="#" style={{color: RED}}>Navbar w/ text</span> */}
            <button  className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span   style={{fontSize:'15px'}} className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/About">About</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Products">Instruments</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/Contact">Contact Us</Link>
                </li>
                </ul>
                {isLogged ? 
                <div className="dropdown" style={{marginRight: '10px'}}>
                    <Avatar alt={userdata.full_name} src={(userdata.avatar)?(userdata.avatar):"/image.jpg"} id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                    <div className="dropdown-menu" style={{position:'realtive', left: '-20px', top: '50px'}} aria-labelledby="dropdownMenuLink">
                        <Link className="dropdown-item" to="/Dashboard">Dashboard</Link>
                        <Link className="dropdown-item" to="" onClick={() => {
                            dispatch(isLog());
                            dispatch(jsontoken(""));
                            }}>Log Out</Link>
                    </div>
                </div>
                :
                <span>
                    <span className={classes.navitems}>
                        <Link className="nav-link" to="/Login">
                            Log In
                        </Link>
                    </span>
                    <span className={classes.navitems}>
                        <Link className="nav-link" to="/Signup">
                            Sign Up
                        </Link>
                    </span>
                </span>
                }
                <span className="navbar-text">
                    <Link className="nav-link" to="/AddProduct" style={{mrgin: '0px',padding: '0px'}}>
                        <Button style={{backgroundColor: RED,color: WHITE,fontWeight: '700',padding: '7px 20px'}}>Post Ads</Button>
                    </Link>
                </span>
            </div>
        </nav>
    );
}