import * as actionTypes from '../actions/actionTypes';

const initialState = {
  dayData: null,
  selectedDay: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DAY_DATA:
      return {
        ...state,
        dayData: action.dayData,
        selectedDay: action.selectedDay,
      };
    case actionTypes.FETCH_DAY_DATA_FAILED:
      return {
        ...state,
        dayData: null,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
