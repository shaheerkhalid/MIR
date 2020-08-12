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
import {prodlist,editProd} from "../../Actions";
import {Link} from 'react-router-dom';

const columns = [
  { id: 'title', label: 'Title', minWidth: 150},
  { id: 'product_type', label: 'Type', minWidth: 100 },
  { id: 'actual_price', label: 'Net Price (Rs)', minWidth: 100 },
  { id: 'price_per_day', label: 'Price/Day (Rs)', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});



export default function AllProducts() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const jsontoken = useSelector(state => state.jsontoken);
  const user = useSelector(state => state.userid);

  const [rows, setrows] = React.useState("");
  

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetch('http://localhost:5000/Api/Product/All',  {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' ,
                            'Authorization': jsontoken
                        }
                    })
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                if(response.success===1){
                    setrows(response.data);
                }
    });
},[]);

  const dispatch = useDispatch();
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    (rows !== "")?
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
                  style={{ minWidth: 180 }}
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
                        <Link id="editlink" to="/AddProduct" ></Link>
                        <Button size="small"  color="primary" variant="contained" onClick={()=>{
                            fetch(`http://localhost:5000/Api/Product/ByUserID`,  {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' ,
                                            'Authorization': jsontoken
                                        },
                                body: JSON.stringify({
                                  "status":1,
                                  "productid":row.product_id
                                })  
                                    })
                              
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(response => {
                                if(response.success===1){
                                  fetch('http://localhost:5000/Api/Product/All',  {
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json' ,
                                                'Authorization': jsontoken
                                            }
                                        })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    if(response.success===1){
                                        setrows(response.data)
                                    }
                                });
                                }
                            });;
                        }}>Active</Button> <Button size="small" color="secondary" variant="contained" onClick={()=>{
                            fetch(`http://localhost:5000/Api/Product/ByUserID`,  {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' ,
                                            'Authorization': jsontoken
                                        },
                                body: JSON.stringify({
                                  "status":0,
                                  "productid":row.product_id
                                })  
                                    })
                              
                            .then(res => res.json())
                            .catch(error => console.error('Error:', error))
                            .then(response => {
                                if(response.success===1){
                                  fetch('http://localhost:5000/Api/Product/All',  {
                                    method: 'GET',
                                    headers: { 'Content-Type': 'application/json' ,
                                                'Authorization': jsontoken
                                            }
                                        })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    if(response.success===1){
                                        setrows(response.data)
                                    }
                                });
                                }
                            });
                        }}> Disable</Button>
                        
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
