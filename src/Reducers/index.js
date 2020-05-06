import loggedReducer from './IsLogged';
import proddataReducer from './Productdata';
import jsontokenReducer from './jsonToken';
import useridReducer from './user_id';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    proddata: proddataReducer,
    isLogged: loggedReducer,
    jsontoken: jsontokenReducer,
    userid: useridReducer
});

export default allReducers;

