import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {RED, WHITE} from "../../Constants";
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import { editProd,prodlist } from "../../Actions";


const useStyles = makeStyles(theme => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    formControl: {
        minWidth: 120,
        maxHeight: 50,
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function CreateCourse(props) {
    const classes = useStyles();
    const editData = useSelector(state => state.editprod);
    
    const [pic, setpic] = React.useState("");
    const [coursepic, setcoursepic] = React.useState("");
    const [helppic,sethelppic] = React.useState("");

    const [coursefile, setcoursefile] = React.useState("");
    
    const [title, settitle] = React.useState("");
    const [titleerr,settitleerr] = React.useState(false);
    const [helptitle,sethelptitle] = React.useState("");

    const [description, setdescription] = React.useState("");
    const [errdescription,seterrdescription] = React.useState(false);
    const [helpdescription,sethelpdescription] = React.useState("");

    const [catid, setcatid] = React.useState(1);

    const [Aprice, setAprice] = React.useState((editData)?editData.actual_price:"");
    const [Apriceerr,setApriceerr] = React.useState(false);
    const [helpAprice,sethelpAprice] = React.useState("");

    const [open, setOpen] = React.useState(false);
    const jsontoken = useSelector(state => state.jsontoken);
    const userID = useSelector(state => state.userid);
    const dispatch = useDispatch();
    

    const Pictures = e => {
            setpic(URL.createObjectURL(e.target.files[0]));
            setcoursepic("");
            setcoursefile(e.target.files[0]);
            sethelppic("");
    }
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    function titleValid(){
        var re = new RegExp("^[a-zA-Z\\d\\-_\\s]{3,30}$");
        if(re.test(title)){
          console.log("valid");
          settitleerr(false);
           sethelptitle("");
        }else{
          console.log("Invalid");
          settitleerr(true);
           sethelptitle("title only contains alphabets and numbers");
        }
    }
    
    function ApriceValid(){
        var re = new RegExp("^\\d+(.\\d{1,2})?$");
        if(re.test(Aprice)){
          console.log("valid");
          setApriceerr(false);
           sethelpAprice("");
        }else{
          console.log("Invalid");
          setApriceerr(true);
           sethelpAprice("Price format 0.00");
        }
      }

      
      function descriptionValid(){
        var re = new RegExp("^.{30,}$");
        if(re.test(description)){
          console.log("valid");
          seterrdescription(false);
          sethelpdescription("");
        }else{
          console.log("Invalid");
          seterrdescription(true);
          sethelpdescription("Must more than 30 characters");
        }
      }
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(pic==="" || title==="" || titleerr || Aprice==="" || Apriceerr || description==="" || errdescription){
            if(pic===""){
                sethelppic("Choose thumbnail for your course");
            }else{
                sethelppic("");
            }
        }else{
            var form = document.getElementById("myform");
          var formData = new FormData(form);
          formData.append('coursepic', coursefile);
            fetch('http://localhost:5000/coursepicUpload',{
              method: 'POST',
              body: formData
          })
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
             if(response.success===1){
                console.log("hamza")
                setcoursepic(response.coursepic_url);
                setpic("");
                const data ={
                  "userid": userID.user_id,
                  "title": title,
                  "catid": catid,
                  "description": description,
                  "dateadded": new Date(),
                  "price":Aprice,
                  "picture":response.coursepic_url,
              };
                  fetch('http://localhost:5000/Api/Course',{
                      method: 'POST',
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
                      }
                  });
             }           
          });
        }
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
            <form id="myform" >
            </form>
                <form id="addform" onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField autoFocus error={titleerr} helperText={helptitle} id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => {settitle(e.target.value)}} onBlur={titleValid} style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={6}>
                        <FormControl variant="outlined" className={classes.formControl} style={{width: "100%"}}>
                        <InputLabel htmlFor="outlined-age-native-simple">Category</InputLabel>
                            <Select
                                native
                                value={catid}
                                onChange={(e) => {setcatid(e.target.value)}}
                                label="Category"
                                >
                                {props.catlist.map(cat => (
                                    <option
                                        key={cat.category_id}
                                        value={cat.category_id}
                                    >
                                        {cat.cat_name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField error={Apriceerr} helperText={helpAprice} type="number" min="1" step="any" id="outlined-basic" label="Price of Instrument" placeholder="00.00" variant="outlined" value={Aprice} onChange={(e) => {setAprice(e.target.value)}} onBlur={ApriceValid} style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField error={errdescription} helperText={helpdescription} id="outlined-textarea" label="Description" multiline variant="outlined" rows="4" value={description} onChange={(e) => {setdescription(e.target.value)}}  onBlur={descriptionValid} style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <span>The pictures should be in a square format (1:1 ratio) </span>
                            <input style={{display: 'none'}}
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                onChange={Pictures}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span">
                                    Upload Picture
                                </Button> <span style={{color: 'red'}}>{helppic}</span>
                            </label>
                            <div>
                                <Grid container>
                                    {(pic!=="") ?      
                                        <Grid item xs={2}>
                                            <img alt="" src={pic} height='100px' width='100px'/>
                                        </Grid>
                                    :""}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Button type="submit" style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Submit</Button>
                        <br></br>
                        <br></br>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Course Added Successfully
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </Container>
    );
}