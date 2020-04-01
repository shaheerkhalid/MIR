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

const columns = [
  { id: 'user', label: 'User', minWidth: 150 },
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'rent', label: 'Rent', minWidth: 150 },
  { id: 'days', label: 'Days', minWidth: 150 },
  { id: 'price', label: 'Price', minWidth: 150 },
];

function createData(user, title, rent, days) {
  const price="1050.00";
  return { user, title, rent, days, price };
}

const rows = [
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
  createData('Wajid', 'Guitar Y30', '10/02/2020', '5'),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
});

export default function History() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
    </div>
  );
}
