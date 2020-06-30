import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useSelector} from 'react-redux';

const columns = [
  { id: 'title', label: 'Title', minWidth: 150},
  { id: 'full_name', label: 'Seller Name', minWidth: 150 },
  { id: 'sell_date', label: 'Buy Date', minWidth: 150 },
  { id: 'actual_price', label: 'Price (Rs)', minWidth: 150 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});


export default function BuyerHistory() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setrows] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const jsontoken = useSelector(state => state.jsontoken);
  const user = useSelector(state => state.userid);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(()=>{
    fetch(`http://localhost:5000/Api/Product/BuyHistory/${user.user_id}`,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
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
    </div>:<div>No Record Found</div>
  );
}
