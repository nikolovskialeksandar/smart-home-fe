import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        token: action.token,
        loading: false,
        error: null,
      };
    case actionTypes.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        userId: null,
        token: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
