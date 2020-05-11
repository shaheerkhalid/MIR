import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Button from "@material-ui/core/Button";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useSelector,useDispatch} from 'react-redux';
import bodyParser from 'body-parser';
import {prodlist,editProd} from "../../Actions";
import {Link} from 'react-router-dom';



const columns = [
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'product_type', label: 'Type', minWidth: 150 },
  { id: 'date_added', label: 'Date', minWidth: 150 },
  { id: 'price_per_day', label: 'Price', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 150 },
];



// function createData(title, type, data, price, status) {
//   return { title, type, data, price, status };
// }

// const rows = [
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
//   createData('Guitar Y30', '10/02/2020', '10/02/2020', 'Guitar'),
// ];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
});



export default function Listing() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const allproducts = useSelector(state => state.prodlist);
  const jsontoken = useSelector(state => state.jsontoken);
  const user = useSelector(state => state.userid);
  // const edit = useSelector(state => state.editprod);

  let rows = allproducts.filter(prod => user.user_id === prod.renter_id);
  
  const dispatch = useDispatch();
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function editHandler(productID){
    
  }


  return (
    (rows !== null)?
    <div>
      <br></br>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
                <TableCell
                  key="action"
                  // align="300"
                  style={{ minWidth: 300 }}
                >
                  Actions
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell key="action" align="300">
                        {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                        <Link to="/AddProduct" ><Button color="primary" variant="contained" onClick={()=>{

                            dispatch(editProd(rows.filter(prod => prod.product_id === row.product_id)[0]))
                            
                            
                        }}>Edit</Button>  </Link>
                        <Button color="secondary" variant="contained" onClick={()=>{
                          fetch(`http://localhost:5000/Api/Product/ByUserID`,  {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' ,
                                        'Authorization': jsontoken
                                    },
                            body: JSON.stringify({"product_id":row.product_id})
                              
                                })
                          
                        .then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {
                            if(response.success===1){
                              fetch('http://localhost:5000/Api/Product',  {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' ,
                                            'Authorization': jsontoken
                                        }
                                    })
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(response => {
                                if(response.success===1){
                                    dispatch(prodlist(response.data));
                                }
                            });
                            }
                        });
          
                        }}> Delete</Button>
                        
                      </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>:<div></div>
  );
}
