import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import {RED, WHITE} from '../Constants';

export default function Navbar() {
    const useStyles = makeStyles(theme => ({
    
    }));
    const classes = useStyles();
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
                    <Link className="nav-link" to="/Contact">Contact</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/About">About</Link>
                </li>
                </ul>
                <span className={classes.avatar} >
                    <Link className="nav-link" to="/Dashboard">
                        <Avatar alt="Wajid" src="" />
                    </Link>
                </span>
                <span className="navbar-text">
                    <Link className="nav-link" to="/AddProduct" style={{mrgin: '0px',padding: '0px'}}>
                        <Button style={{backgroundColor: RED,color: WHITE,fontWeight: '700',padding: '7px 20px'}}>Post Ads</Button>
                    </Link>
                </span>
            </div>
        </nav>
    );
}