import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Fbicon from '@material-ui/icons/Facebook';
import Instaicon from '@material-ui/icons/Instagram';
import Tweeticon from '@material-ui/icons/Twitter';
import {BLACK, WHITE} from '../Constants/index';

import Typography from '@material-ui/core/Typography';

export default function Footer() {
    const useStyles = makeStyles(theme => ({
        grow: {
          flexGrow: 1,
        },
        iconspace: {
            margin: '0px 5px',
        },
    }));
    const classes = useStyles();

    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" style={{backgroundColor: BLACK, padding: '20px 50px'}}>
                <Link id="Fblink" href="https://www.facebook.com/"></Link>
                <Link id="Instalink" href="https://www.instagram.com/"></Link>
                <Link id="Twiterlink" href="https://www.twitter.com/"></Link>
                    <Fbicon className={classes.iconspace} color = 'primary' fontSize = 'large' onClick={()=>{document.getElementById('Fblink').click()}}/>
                    <Instaicon className={classes.iconspace} color = 'secondary' fontSize = 'large' onClick={()=>{document.getElementById('Instalink').click()}}/>
                    <Tweeticon className={classes.iconspace} color = 'primary' fontSize = 'large' onClick={()=>{document.getElementById('Twiterlink').click()}}/>
            </Container>
            <Container maxWidth="xl" style={{backgroundColor: '#333333', padding: '20px 50px' , textAlign: 'center'}}>
                <Typography style={{color: WHITE}}>
                    Copyright © 2003 - 2019 On The Road (Pvt) Ltd. - All Rights Reserved.
                    Reproduction of material from any MIR pages without permission is strictly prohibited.
                </Typography>
            </Container>
        </React.Fragment>
    );
}