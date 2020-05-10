import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {PanelListS} from './CategoryList';
import {DataView} from 'primereact/dataview';
import PCard from './GridCard';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Dropdown} from "primereact/dropdown";
import {RED} from '../../Constants';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';


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
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  links: {
    opacity: '0.7',
    fontSize: '16px',
    fontWeight: '600',
    '&:hover': {
        opacity: '1',
        textDecoration: 'none',
      }
  },
  innerlinks: {
    opacity: '0.7',
    fontSize: '14px',
    color: 'black',
    fontWeight: '600',
    '&:hover': {
        opacity: '1',
        textDecoration: 'none',
      }
  },
  }));


function renderListItem(card_data) {
  return (
    <div></div>
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
      {label: 'For Sale', value: 'sale'},
      {label: 'For Rent', value: 'rent'}
  ];
  // const [sortKey, setsortKey] = useState(null);
  return (
      <div className="p-grid">
          <div className="p-col-6" style={{textAlign: 'left'}}>
              <Dropdown options={sortOptions} value={null} placeholder="View Instrument" onChange={onSortChange} />
          </div>
          <div className="p-col-6" style={{textAlign: 'right'}}>
              {/* <DataViewLayoutOptions layout={layout} onChange={(e) => this.setState({layout: e.value})} /> */}
          </div>
      </div>
  );
}

export default function ProductListing(props) {
    const header = renderHeader();
    const classes = useStyles();
    const proddata = useSelector(state => state.prodlist);
    const [prodlist,setprodlist] = React.useState(proddata);
    // const filterprods=prodlist.filter(prod => prod.category_id===cat_id);
    // const [layout, setlayout] = React.useState('grid');




    return(
      (prodlist!=="")?
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl" style={{padding: '15px'}}>
          <Grid container spacing={3}>
            <Grid className={classes.category1} item xs={12}>
                    <PanelListS catlist={props.catlist}/>
                    <hr></hr>
            </Grid>
            <Grid className={classes.category2} item md={2}>
            <List className={classes.root} >
                <li className={classes.listSection}>
                  <ul className={classes.ul}>
                  <ListItem >
                        <Link className={classes.links} color='primary' underline='none' onClick={()=>{setprodlist(proddata);}}>All Categories</Link>
                  </ListItem>
                  {props.catlist.map(cat => (
                        <ListItem
                          key={cat.category_id}
                          align={cat.align}
                          style={{ minWidth: cat.minWidth }}
                        >
                          <Link className={classes.innerlinks} onClick={()=>{setprodlist(proddata.filter(prod => prod.category_id===cat.category_id));}} color='primary' underline='none'>
                            {cat.cat_name}
                          </Link>
                        </ListItem>
                    ))}
                  </ul>
                </li>
            </List>
            </Grid>
            <Grid item xs={12} md={10}>
            <Grid container justify="center" alignItems="center">
            <Grid item xs={8}>
              <Paper component="form" className={classes.searchbar}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Instrument"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={(e)=>{setprodlist(proddata.filter(prod => {return prod.title.toLowerCase().includes(e.target.value.toLowerCase())}));}}
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
              <DataView value={prodlist} layout={'grid'} itemTemplate={itemTemplate} header={header} totalRecords={14}></DataView>
   
              </Paper>
            </Grid>
          </Grid>
            </Grid>    
          </Grid>
          </Container>
        </React.Fragment>:<div>
                    <Backdrop className={classes.backdrop} open>
                        <CircularProgress color="primary" />
                    </Backdrop>
                </div>
    );
}










