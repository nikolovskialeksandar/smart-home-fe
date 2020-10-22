import * as actionTypes from '../actions/actionTypes';

const initialState = {
  sonoffState: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SONOFF_DATA:
      return {
        ...state,
        sonoffState: action.sonoffState,
        error: false,
      };
    case actionTypes.FETCH_SONOFF_DATA_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.SEND_SONOFF_DATA_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
