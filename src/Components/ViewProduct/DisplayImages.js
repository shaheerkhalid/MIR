import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useSelector} from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

export default function DisplayImages(props) {
  const classes = useStyles();
  const jsontoken = useSelector(state => state.jsontoken);
  const [pics, setpics] = React.useState([]);
  
  React.useEffect(()=>{
    fetch(`http://localhost:5000/Api/Product/Picture/${props.proddata.product_id}`,  {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' ,
                                'Authorization': jsontoken
                            }
                    })
                .then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                  if(response.success===1){
                        setpics(response.data);
                  }
    });
  },[]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
              <img alt="" src={props.proddata.picture_file_name} width="100%"/>
          </Paper>
        </Grid>
        {pics.map(pic => (
              <Grid item xs={3}>
                <Paper className={classes.paper}>
                  <img alt="" src={pic.picture_file_name} width="100%"/>
                </Paper>
              </Grid>
        ))}
      </Grid>
    </div>
  );
}