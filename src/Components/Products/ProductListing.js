import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CategoryList1 from './CategoryList1';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import data from '../../Assets/MOCK_DATA.json';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {RED,WHITE} from '../../Constants';


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
  }));




  
function ProductCard(card_data){
  const header = 
  <div style={{position: 'relative'}}>
      <img  alt="Card" src={'https://i.picsum.photos/id/1'+card_data.id+'/200/200.jpg'}/>
      <label style={{
          position: 'absolute',
          top:'5px',
          left:'5px',
          backgroundColor:RED,
          color:WHITE ,
          fontWeight:'bold',
          padding:'2px 10px',
          }}>{card_data.price} /Day</label>
  </div>

  const footer = <span>
                  <Button label="Buy" icon="pi pi-check" style={{marginRight: '.25em'}}/>
               </span>;
  return(
      <Card header={header} footer={footer} title={card_data.title} subTitle={card_data.description} style={{padding:'10px'}}>
          
      </Card>
      
  );
}

function itemTemplate(item,layout){
//   if (layout === 'list') {
//     return (
//         <div className="p-grid">
//             <div>{item.brand}</div>
//         </div>
//     );
// }
// if (layout === 'grid') {
//     return (
//         <div className="p-col-12 p-md-3">
//             <div>{item.brand}</div>
//         </div>
//     );
// }

  return(<span>test</span>);

}


export default function ProductListing() {

    const classes = useStyles();
    return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="xl" style={{ padding: '50px' }} >
          <Grid container spacing={3}>
            <Grid className={classes.category1} item xs={12}>
                    <CategoryList1/>
                    <hr></hr>
            </Grid>
            <Grid className={classes.category2} item xs={2}>
            <Typography variant='h5'>Categories</Typography>
                    <Typography>
                        <Link href="#">Link1</Link><br></br>
                        <Link href="#">Link1</Link><br></br>
                        <Link href="#">Link1</Link><br></br>
                        <Link href="#">Link1</Link><br></br>
                        <Link href="#">Link1</Link><br></br>
                    </Typography>
            </Grid>
            <Grid item xs={10}>
              {/* <DataView value={this.state.cars} layout={this.state.layout} itemTemplate={this.itemTemplate} paginator={true} rows={10} first={this.state.first} onPage={(e) => this.setState({first: e.first})}></DataView> */}
              <DataView value={data} layout={'grid'} itemTemplate={itemTemplate}></DataView>

            </Grid>    
          </Grid>
          </Container>
        </React.Fragment>
    );
}