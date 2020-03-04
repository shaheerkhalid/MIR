import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {PanelListL,PanelListS} from './CategoryList';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import data from '../../Assets/MOCK_DATA.json';
import PCard from './GridCard';
import {Button} from 'primereact/button';
import {RED,WHITE} from '../../Constants';
import "../../../node_modules/primeflex/primeflex.css";


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    category1: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'block',
        },
    },
    category2: {
        display: 'block',
        borderRight: '1px solid lightgrey',
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));


function renderListItem(card_data) {
  return (
    <div className="p-col-12">
    <div className="car-details" style={{

    }}>
      <div>
            <img src={'https://i.picsum.photos/id/1'+card_data.id+'/200/200.jpg'}/>
            <div className="p-grid">
                <div className="p-col-12">Vin: <b>{card_data.price}</b></div>
                
            </div>
        </div>
        <Button icon="pi pi-search" ></Button>
      </div>
    </div>
  );
}



function renderGridItem(card_data) {
    return <PCard card_data={card_data}/>;
}



function itemTemplate(card_data,layout){

  if (layout === 'list') {
    return renderListItem(card_data);
  }
  if (layout === 'grid') {
    return renderGridItem(card_data);
  }
}

export default function ProductListing() {

    const classes = useStyles();
    // const [layout, setlayout] = React.useState('grid');
    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl" style={{ padding: '25px ' }} >
          <Grid container spacing={3}>
            <Grid className={classes.category1} item xs={12}>
                    <PanelListS/>
                    <hr></hr>
            </Grid>
            <Grid className={classes.category2} item md={2}>
                <PanelListL/>
            </Grid>
            <Grid item xs={12} md={10}>
              {/* <DataView value={this.state.cars} layout={this.state.layout} itemTemplate={this.itemTemplate} paginator={true} rows={10} first={this.state.first} onPage={(e) => this.setState({first: e.first})}></DataView> */}
              {/* <DataViewLayoutOptions layout={layout} onChange={(e) => setlayout(e.value)} /> */}

              <DataView value={data} layout={'grid'} itemTemplate={itemTemplate}></DataView>

            </Grid>    
          </Grid>
          </Container>
        </React.Fragment>
    );
}










