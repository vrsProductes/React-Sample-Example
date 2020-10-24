import empReducer from './empReducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    empData:empReducer
})

export default rootReducer