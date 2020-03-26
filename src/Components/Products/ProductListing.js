import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {PanelListL,PanelListS} from './CategoryList';

import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import data from '../../Assets/MOCK_DATA.json';
import PCard from './GridCard';
import {Button} from 'primereact/button';
import {Dropdown} from "primereact/dropdown";
import {RED,WHITE} from '../../Constants';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


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
    searchbar: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: '15px',
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


function renderListItem(card_data) {
  return (
    <div className="p-col-12">
    <div className="car-details" style={{

    }}>
      <div>
            <img src={'https://i.picsum.photos/id/1'+card_data.id+'/200/200.jpg'}alt="card"/>
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


function onSortChange(event) {
  const value = event.value;

  if (value.indexOf('!') === 0) {
      // this.setState({
      //     sortOrder: -1,
      //     sortField: value.substring(1, value.length),
      //     sortKey: value
      // });
  }
  else {
      // this.setState({
      //     sortOrder: 1,
      //     sortField: value,
      //     sortKey: value
      // });
  }
}


function renderHeader() {
  const sortOptions = [
      {label: 'Newest First', value: '!year'},
      {label: 'Oldest First', value: 'year'},
      {label: 'Brand', value: 'brand'}
  ];
  // const [sortKey, setsortKey] = useState(null);
  return (
      <div className="p-grid">
          <div className="p-col-6" style={{textAlign: 'left'}}>
              <Dropdown options={sortOptions} value={null} placeholder="Sort By" onChange={onSortChange} />
          </div>
          <div className="p-col-6" style={{textAlign: 'right'}}>
              {/* <DataViewLayoutOptions layout={layout} onChange={(e) => this.setState({layout: e.value})} /> */}
          </div>
      </div>
  );
}





export default function ProductListing() {
    const header = renderHeader();
    const classes = useStyles();
    // const [layout, setlayout] = React.useState('grid');
    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl" style={{padding: '15px'}}>
          <Grid container spacing={3}>
            <Grid className={classes.category1} item xs={12}>
                    <PanelListS/>
                    <hr></hr>
            </Grid>
            <Grid className={classes.category2} item md={3}>
                <PanelListL/>
            </Grid>
            <Grid item xs={12} md={9}>
            <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <Paper component="form" className={classes.searchbar}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Instrument"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                 
              {/* <DataView value={this.state.cars} layout={this.state.layout} itemTemplate={this.itemTemplate} paginator={true} rows={10} first={this.state.first} onPage={(e) => this.setState({first: e.first})}></DataView> */}
              {/* <DataViewLayoutOptions layout={layout} onChange={(e) => setlayout(e.value)} /> */}

              <DataView value={data} layout={'grid'} itemTemplate={itemTemplate} header={header} paginator={true} rows={8}></DataView>
   
              </Paper>
            </Grid>
          </Grid>
            </Grid>    
          </Grid>
          </Container>
        </React.Fragment>
    );
}










