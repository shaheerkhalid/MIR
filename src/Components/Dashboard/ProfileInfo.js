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
    const [helpphone, sethelpphone] = React.useState("");
    const [err, seterr] = React.useState(false);
    const classes = useStyles();

    const handlePhone  = e => {
        setphnbr(e.target.value);     
    }

    function phValid(){
      var re = new RegExp("^[0][3][0-9]{2}[-][0-9]{7}$");
      if(re.test(phnbr)){
        console.log("valid");
        seterr(false);
        sethelpphone("");
      }else{
        console.log("Invalid");
        seterr(true);
        sethelpphone("Incorrect Phone follow given pattern 03**-*******");
      }
    }
    return(
        <form className={classes.root}>
          <br></br>
            <TextField id="outlined-basic" label="FirstName" variant="outlined" />
          <br></br>
          <br></br>  
            <TextField id="outlined-basic" label="LastName" variant="outlined" />
          <br></br>
          <br></br>  
            <TextField id="outlined-basic" label="Username" variant="outlined" />
          <br></br>
          <br></br>
            <TextField error={err} id="outlined-basic" label="Phone Number" placeholder="03**-*******" value={phnbr} onChange={handlePhone} onBlur={phValid} variant="outlined" helperText={helpphone}/>
          <br></br>
          <br></br>
          <TextField id="outlined-basic" label="Address" variant="outlined" />
          <br></br>
          <br></br>
          <span>The profile picture should be in a square format (1:1 ratio)</span>
          <Button style={{width: '150px'}} variant="contained" component="label">Upload File<input type="file" style={{ display: "none" }}/></Button>
          <br></br>
          <br></br>
            <TextField id="outlined-textarea" label="About You" multiline variant="outlined" rows="4"/>
          <br></br>
          <br></br>
            <Button style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Submit</Button>
        </form>
    );
}