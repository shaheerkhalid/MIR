import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {RED, WHITE} from '../../Constants';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {userid} from "../../Actions";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';



const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  }));



export default function ProfileInfo() {
    const [err, seterr] = React.useState(false);
    const jsontoken = useSelector(state => state.jsontoken);
    const userID = useSelector(state => state.userid);
    const dispatch = useDispatch();
  
  
    const [fname, setfname] = React.useState(userID.full_name.split(" ")[0]);
    const [lname, setlname] = React.useState(userID.full_name.split(" ")[1]);
    console.log(userID);
    const [helpphone, sethelpphone] = React.useState(userID.phone);
    const [email, setemail] = React.useState(userID.email);
    const [address, setaddress] = React.useState(userID.address);
    const [phnbr, setphnbr] = React.useState(userID.phone);
    const [about, setabout] = React.useState(userID.about);
    const [avatar, setavatar] = React.useState(userID.avatar);
    const [tempavatar, settempavatar] = React.useState("");
    const [avatarfile, setavatarfile] = React.useState("");
    const [open, setOpen] = React.useState(false);
    
    
  

    const classes = useStyles();

    const submithandler = (e)=>{
      e.preventDefault();
      if(avatarfile!==""){
        var form = document.getElementById("myform");
          var formData = new FormData(form);
          formData.append('avatar', avatarfile);
            fetch('http://localhost:5000/avatarUpload',{
              method: 'POST',
              body: formData
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
             if(response.success===1){
                setavatar(response.avatar_url);
                settempavatar("");
                const data ={
                  "user_id":userID.user_id,
                  "fullname":fname+" "+lname,
                  "email":email,
                  "phone":phnbr,
                  "avatar":response.avatar_url,
                  "address":address,
              };
                  fetch('http://localhost:5000/Api/User',{
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json',
                                  'Authorization': jsontoken,
                              },
                              body: JSON.stringify(data)
                          })
                  .then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                      if(response.success===1){ 
                        console.log(response)
                        setOpen(true);
                          fetch(`http://localhost:5000/Api/User/:${userid.user_id}`,{
                          method: 'GET',
                          headers: { 'Content-Type': 'application/json',
                                      'Authorization': jsontoken,
                                  },
                              })
                      .then(res => res.json())
                      .catch(error => console.error('Error:', error))
                      .then(response => {
                          if(response.success===1){ 
                            console.log(response.data)
                            dispatch(userid(response.data));
                          }
                      });
                      }
                  });
             }              
          });
      }else{
        const data ={
          "user_id":userID.user_id,
          "fullname":fname+" "+lname,
          "email":email,
          "phone":phnbr,
          "avatar":avatar,
          "address":address,
      };
          fetch('http://localhost:5000/Api/User',{
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json',
                          'Authorization': jsontoken,
                      },
                      body: JSON.stringify(data)
                  })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
              if(response.success===1){ 
                console.log(response)
                setOpen(true);
                  fetch(`http://localhost:5000/Api/User/:${userid.user_id}`,{
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json',
                              'Authorization': jsontoken,
                          },
                      })
                  .then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => {
                    if(response.success===1){ 
                      console.log(response.data)
                      dispatch(userid(response.data));
                  }
              });
              }
          });
      }
      
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    const newAvatar = e => {
        settempavatar(URL.createObjectURL(e.target.files[0]));
        setavatar("");
        setavatarfile(e.target.files[0]);
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
      <div>
        <form id="myform"></form>
        <form className={classes.root} onSubmit={submithandler}>
          <br></br>
            <TextField id="outlined-basic" label="FirstName" variant="outlined" value={fname} onChange={(e)=>{
              setfname(e.target.value)
            }}/>
          <br></br>
          <br></br>  
            <TextField id="outlined-basic" label="LastName" variant="outlined"  value={lname} onChange={(e)=>{
              setlname(e.target.value)
            }}/>
          <br></br>
          <br></br>  
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} disabled/>
          <br></br>
          <br></br>
            <TextField error={err} id="outlined-basic" label="Phone Number" placeholder="03**-*******" value={phnbr} onChange={(e)=>{
              setphnbr(e.target.value)
            }} onBlur={phValid} variant="outlined" helperText={helpphone}/>
          <br></br>
          <br></br>
          <TextField id="outlined-basic" label="Address" variant="outlined" value={address} onChange={(e)=>{
              setaddress(e.target.value)
            }}/>
          <br></br>
          <br></br>
          <span>The profile picture should be in a square format (1:1 ratio)</span>
          <Button style={{width: '150px'}} variant="contained" component="label">Upload File<input type="file" accept="image/*" style={{ display: "none" }} onChange={newAvatar}/></Button>
          {(avatar === "" )?"":<div><img alt="" src={avatar} height='100px' width='100px'/></div>}
          {(tempavatar === "" )?"":<div><img alt="" src={tempavatar} height='100px' width='100px'/></div>}
          <br></br>
          <br></br>
            <TextField id="outlined-textarea" label="About You" multiline variant="outlined" rows="4" value={about} onChange={(e)=>{
              setabout(e.target.value)
            }}/>
          <br></br>
          <br></br>
            <Button type="submit" style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Submit</Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                       Profile Info Updated!
                        </Alert>
        </Snackbar>
      </div>
    );
}