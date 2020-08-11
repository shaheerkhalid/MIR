import loggedReducer from './IsLogged';
import proddataReducer from './Productdata';
import jsontokenReducer from './jsonToken';
import useridReducer from './user_id';
import prodListReducer from './prodList';

import cartReducer from './cart';
import requestReducer from './Request';
import searchReducer from './search';

import editProductReducer from './editProduct';

import instructorReducer from './instructor';
import courseListReducer from './courseList';

import coursedataReducer from './courseData';

import userlistReducer from './userList';

import messageReducer from './message';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    proddata: proddataReducer,
    isLogged: loggedReducer,
    jsontoken: jsontokenReducer,
    userid: useridReducer,
    prodlist: prodListReducer,
    cartdata: cartReducer,
    requestdata: requestReducer,
    searchdata: searchReducer,
    editprod: editProductReducer, 
    instructor: instructorReducer,
    courselist: courseListReducer,
    coursedata: coursedataReducer,
    userlist: userlistReducer,
    message: messageReducer,
});

export default allReducers;

