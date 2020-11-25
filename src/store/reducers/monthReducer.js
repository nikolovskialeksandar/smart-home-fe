import * as actionTypes from '../actions/actionTypes';

const initialState = {
  monthData: null,
  selectedMonth: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MONTH_DATA:
      return {
        ...state,
        monthData: action.monthData,
        selectedMonth: action.selectedMonth,
      };
    case actionTypes.FETCH_MONTH_DATA_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
