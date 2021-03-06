import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {Link} from "react-router-dom";
import { RED } from '../../Constants';
import {searchvalue} from '../../Actions';
import {useDispatch} from 'react-redux';

export default function Header() {
    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        searchbar: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        container: {
            backgroundImage: 'url(http://getwallpapers.com/wallpaper/full/1/8/b/242505.jpg)', 
            height: 550,
            backgroundRepeat: 'no-repeat', 
            backgroundSize: '100%',
            textAlign: 'center',
            backgroundColor: 'black',
            [theme.breakpoints.down("md")]: {
              height: 400,
            },
          [theme.breakpoints.down("sm")]: {
            height: 350,
          },
          [theme.breakpoints.down("xs")]: {
            height: 250,
          },
        },
        headertext: {
            color : 'white',
            fontSize : '50px',
            marginTop : '75px',
          [theme.breakpoints.down("md")]: {
            fontSize : '40px',
            marginTop : '50px',
          },
          [theme.breakpoints.down("sm")]: {
            fontSize : '35px',
            marginTop : '30px',
          },
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
            '&:hover': {
              color: RED,
            }
        },
        divider: {
            height: 28,
            margin: 4,
        },
      }));

      const classes = useStyles();
      const [stype, setstype] = React.useState("Instrument");
      const [svalue, setsvalue] = React.useState("");
      const dispatch = useDispatch();

      const handleChange = e => {
        setstype(e.target.value);
      }

      const handleSubmit = e => {
        e.preventDefault();
        dispatch(searchvalue(svalue));
        (stype==="Instrument")?document.getElementById("srchInstrument").click():document.getElementById("srchCourse").click();
      }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.container} maxWidth="xl" style={{ }} >
        <Typography component="div">
        <br></br>
        <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12} sm={8} md={6}>
            <Typography className={classes.headertext}>Discover Your Favourite Instruments</Typography>
            <Paper component="form" onSubmit={handleSubmit} className={classes.searchbar}>
                <Select
                  value={stype}
                  onChange={handleChange}
                  disableUnderline
                  style={{width: "120px"}}
                >
                  <MenuItem value={"Instrument"}>Instrument</MenuItem>
                  <MenuItem value={"Course"}>Course</MenuItem>
                </Select>
                <Divider className={classes.divider} orientation="vertical" />
                <InputBase
                    className={classes.input}
                    value={svalue}
                    placeholder="Search here..."
                    onChange={(e) => {setsvalue(e.target.value)}} 
                />
                <Divider className={classes.divider} orientation="vertical" />
                <Link id="srchInstrument" to="/Products"></Link>
                <Link id="srchCourse" to="/Courses"></Link>
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Grid>
      </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}