import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {RED, WHITE} from "../../Constants";

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
    }
}));

export default function AddProduct() {
    const classes = useStyles();

    const [pic, setpic] = React.useState("");

    const Pictures = e => {
            var path = URL.createObjectURL(e.target.files[0]);
            setpic(path);
    }

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Title" variant="outlined" style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Description" variant="outlined" style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="outlined-basic" label="Category" variant="outlined" style={{width: "100%"}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <span>The pictures should be in a square format (1:1 ratio) </span>
                            <input style={{display: 'none'}}
                                accept="image/*"
                                id="contained-button-file"
                                // multiple
                                type="file"
                                onChange={Pictures}
                            />
                            <label htmlFor="contained-button-file">
                                <Button variant="contained" component="span">
                                    Upload Picture
                                </Button>
                            </label>
                            <div>
                                <img alt="" src={pic} height='100px' width='100px'/>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField prefix='Rs.'  id="outlined-basic" label="Price" variant="outlined" style={{width: "100%"}}/>
                        </Grid>
                    </Grid>
                    <br></br>
                        <Button style={{backgroundColor: RED,color: WHITE,fontSize: '18px' ,fontWeight: '700',padding: '10px',width: '200px'}}>Submit</Button>
                        <br></br>
                        <br></br>
                    <Grid container justify="flex-end">
                        
                    </Grid>
                </form>
            </div>
        </Container>
    );
}