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
import {useSelector} from 'react-redux';

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

export default function AddProduct(props) {
    const classes = useStyles();
    const [pic, setpic] = React.useState("");
    const [files, setfiles] = React.useState("");
    const [title, settitle] = React.useState("");
    const [description, setdescription] = React.useState("");
    const [catid, setcatid] = React.useState(1);
    const [brandid, setbrandid] = React.useState(1);
    const [Aprice, setAprice] = React.useState("");
    const [Dprice, setDprice] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState('rent');
    const [open, setOpen] = React.useState(false);
    const jsontoken = useSelector(state => state.jsontoken);
    const userid = useSelector(state => state.userid);

    const Pictures = e => {
            var path=[];
            Array.from(e.target.files).forEach(f => {path.push(URL.createObjectURL(f))});
            setpic(path);
            setfiles(e.target.files);
    }
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleSubmit = e => {
        e.preventDefault();
        let prodid="";
        let ismain=1;
        const data ={
            "renterid":userid.user_id,
            "catid":catid,
            "brandid":brandid,
            "title":title,
            "description":description,
            "dateadded":new Date(),
            "priceperday":Dprice,
            "actualprice":Aprice,
        };
            fetch('http://localhost:5000/Api/Product',  {
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
                    prodid=response.data.insertId;
                    var form = document.getElementById("myform");
                    Array.from(files).forEach(f => {
                        var formData = new FormData(form);
                        formData.append('product', f);
                        	fetch('http://localhost:5000/upload',{
                            method: 'POST',
                            body: formData
                        })
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response.success===1){
                                const picdata={
                                    "prodid" : prodid,
                                    "picname" : response.product_url,
                                    "ismain" : ismain
                                }
                                fetch('http://localhost:5000/Api/Product/Picture',  {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json',
                                                'Authorization': jsontoken,
                                            },
                                            body: JSON.stringify(picdata)
                                        })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                })
                                ismain=0;
                            }
                        });
                    });
                    document.getElementById("addform").reset();
                    setOpen(true);

                }
            });
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
                            Rent <Radio
                                checked={selectedValue === 'rent'}
                                onChange={(e) => {setSelectedValue(e.target.value)}}
                                value="rent"
                                name="radio-button-demo"
                            />
                            Sale <Radio
                                checked={selectedValue === 'sale'}
                                onChange={(e) => {setSelectedValue(e.target.value)}}
                                value="sale"
                                name="radio-button-demo"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Title" variant="outlined" onChange={(e) => {settitle(e.target.value)}} style={{width: "100%"}}/>
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
                        <FormControl variant="outlined" className={classes.formControl} style={{width: "100%"}}>
                        <InputLabel htmlFor="outlined-age-native-simple">Brand</InputLabel>
                            <Select
                                native
                                value={brandid}
                                onChange={(e) => {setbrandid(e.target.value)}}
                                label="Brand"
                                >
                                {props.brandlist.map(brand => (
                                    <option
                                        key={brand.brand_id}
                                        value={brand.brand_id}
                                    >
                                        {brand.brand_name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" min="1" step="any" id="outlined-basic" label="Price of Instrument" placeholder="00.00" variant="outlined" onChange={(e) => {setAprice(e.target.value)}} style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={6}>
                        {(selectedValue==='rent')?<TextField type="number" min="1" step="any" id="outlined-basic" label="Price Per Day" placeholder="00.00" variant="outlined" onChange={(e) => {setDprice(e.target.value)}} style={{width: "100%"}}/>:""}
                            
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-textarea" label="Description" multiline variant="outlined" rows="4" onChange={(e) => {setdescription(e.target.value)}} style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <span>The pictures should be in a square format (1:1 ratio) </span>
                            <input style={{display: 'none'}}
                                multiple
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                onChange={Pictures}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span">
                                    Upload Picture
                                </Button>
                            </label>
                            <div>
                                <Grid container>
                                    {(pic!=="") ? pic.map(pic => (       
                                        <Grid item xs={2}>
                                            <img alt="" src={pic} height='100px' width='100px'/>
                                        </Grid>
                                    )):""}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                    <br></br>
                    <Button type="submit" style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Submit</Button>
                        <br></br>
                        <br></br>
                    <Link to="/Products" id="sub"></Link>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                        This is a success message!
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </Container>
    );
}