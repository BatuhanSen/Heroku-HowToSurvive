import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  location: null,
  error: null,
};

const setLoc = (state, action) => {
    return updateObject(state, {
      location: action.location,
    });
  };

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SET_LOC:
        return setLoc(state, action);
      default:
        return state;
    }
  };
  
  export default reducer;