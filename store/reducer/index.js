import { combineReducers } from 'redux';
import counterReducer from './counter';
import userReducer from './user';
import popupUniversal from './popupUniversal';
import lot from './lot';
import popup from './popup';
import customization from './customization';
import floorplan from './floorplan';
import priceFactor from "./priceFactor"
const appReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
    popupUniversal,
    lot,
    popup,
    customization,
    floorplan,
    priceFactor
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOG_OUT') {
      return appReducer(undefined, action)
    }
  
    return appReducer(state, action)
  }

export default rootReducer;