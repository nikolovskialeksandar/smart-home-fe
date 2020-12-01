import * as actionTypes from '../actions/actionTypes';

const initialState = {
  yearData: null,
  selectedYear: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_YEAR_DATA:
      return {
        ...state,
        yearData: action.yearData,
        selectedYear: action.selectedYear,
      };
    case actionTypes.FETCH_YEAR_DATA_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
