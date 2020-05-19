import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {useSelector,useDispatch} from 'react-redux';

const columns = [
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'full_name', label: 'Renter Name', minWidth: 150 },
  { id: 'rent_from', label: 'Rent From', minWidth: 150 },
  { id: 'days', label: 'Days', minWidth: 100 },
  { id: 'price_per_day', label: 'Amount', minWidth: 150 },
];

const columns1 = [
  { id: 'title', label: 'Title', minWidth: 150 },
  { id: 'full_name', label: 'Renter Name', minWidth: 150 },
  { id: 'rent_from', label: 'Rent From', minWidth: 150 },
  { id: 'days', label: 'Days', minWidth: 150 },
  { id: 'price_per_day', label: 'Amount', minWidth: 150 },
];



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
}));


export default function History() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rows, setrows] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [page1, setPage1] = React.useState(0);
  const [rows1, setrows1] = React.useState("");
  const [rowsPerPage1, setRowsPerPage1] = React.useState(8);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const jsontoken = useSelector(state => state.jsontoken);
  const user = useSelector(state => state.userid);

  React.useEffect(()=>{
    fetch(`http://localhost:5000/Api/Product/ProductsRenteeHistory/${user.user_id}`,  {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
                    'Authorization': jsontoken
                }
            })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
        if(response.success===1){
            setrows1(response.data);
        }
    });
    fetch(`http://localhost:5000/Api/Product/OnRentProductsRentee/${user.user_id}`,  {
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };

  const handleChangeRowsPerPage1 = event => {
    setRowsPerPage1(+event.target.value);
    setPage1(0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="On Rent Instruments" {...a11yProps(0)} />
          <Tab label="History" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        {(rows!=="")?
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
                      style={{ minWidth: 150 }}
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
                        <Button size="small"  color="primary" variant="contained" onClick={()=>{
                          fetch(`http://localhost:5000/Api/Product/UpdateRentRecord`,  {
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

                                    }
                                });
                                fetch(`http://localhost:5000/Api/Product/ProductsRenteeHistory/${user.user_id}`,  {
                                  method: 'GET',
                                  headers: { 'Content-Type': 'application/json',
                                              'Authorization': jsontoken
                                          }
                                        })
                                .then(res => res.json())
                                .catch(error => console.error('Error:', error))
                                .then(response => {
                                    if(response.success===1){
                                        setrows1(response.data);
                                    }
                                });
                                fetch(`http://localhost:5000/Api/Product/OnRentProductsRentee/${user.user_id}`,  {
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
                            }
                        });
                        }}>Return</Button>
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
          </Paper>:<div>No Record Found</div>}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        {(rows1!=="")?
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns1.map(column => (
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
                    {rows1.slice(page1 * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1).map(row => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns1.map(column => {
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
                count={rows1.length}
                rowsPerPage={rowsPerPage1}
                page={page1}
                onChangePage={handleChangePage1}
                onChangeRowsPerPage={handleChangeRowsPerPage1}
              />
            </Paper>:<div>No History Found</div>}
        </TabPanel>
      </SwipeableViews>
    </div>
    </div>
  );
}
