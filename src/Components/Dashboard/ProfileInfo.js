import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {RED, WHITE} from '../../Constants';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  }));



export default function ProfileInfo() {
    const [phnbr, setphnbr] = React.useState("");
    const [err, seterr] = React.useState(false);
    const classes = useStyles();

    const handlePhone = e => {
      var re = new RegExp("[0][3][0-9]{2}[-][0-9]{7}");
      if(e.target.value.length === 4){
        setphnbr(e.target.value + "-");  
      }else if(e.target.value.length === 5){
        setphnbr(e.target.value.slice(0,-1));
      }else{
        setphnbr(e.target.value);
      }

      if(re.test(phnbr)){
        console.log(e.target.value);
        console.log("valid");
        seterr(true);
      }else{
        console.log(e.target.value);
        console.log("Invalid");
        seterr(false);
      }
      
    }

    return(
        <form className={classes.root}>
            <label>First Name:</label>
            <TextField id="outlined-basic" label="FirstName" variant="outlined" />
            <label>Last Name:</label>
            <TextField id="outlined-basic" label="LastName" variant="outlined" />
            <label>Username:</label>
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <label>Phone Number:</label>
            <TextField error={err} id="outlined-basic" label="Phone Number" pattern="[0][3][0-9]{2}[-][1-9]{7}" placeholder="03**-*******" value={phnbr} onChange={handlePhone} variant="outlined" />
            <label>About You:</label>
            <TextField id="outlined-textarea" label="Multiline Placeholder" multiline variant="outlined"/>
            <Button style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Submit</Button>
        </form>
    );
}