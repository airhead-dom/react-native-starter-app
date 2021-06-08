import {combineReducers} from '@reduxjs/toolkit';
import todoReducer from './todo/reducer';

export default combineReducers({
  todo: todoReducer,
});
