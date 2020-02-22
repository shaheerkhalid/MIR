import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

import Link from '@material-ui/core/Link';
import {RED, WHITE} from '../Constants';




export default function Navbar() {
    const useStyles = makeStyles(theme => ({
        
    }));
    const classes = useStyles();
    return(
        <nav className="navbar navbar-expand-md navbar-light" style={{backgroundColor: WHITE,padding : '0px 10px'}}>
            <Typography className={classes.title} variant="h4" noWrap style={{color: RED , fontWeight: 'bold'}}>
                MIRS
            </Typography>
            {/* <span className="navbar-brand" href="#" style={{color: RED}}>Navbar w/ text</span> */}
            <button  className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span   style={{fontSize:'15px'}} className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Features</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="#">Pricing</Link>
                </li>
                </ul>
                <span className="navbar-text">
                    <Button style={{backgroundColor: RED,color: WHITE,fontWeight: '700',padding: '5px 20px'}}>Post Ads</Button>
                </span>
            </div>
        </nav>
    );
}