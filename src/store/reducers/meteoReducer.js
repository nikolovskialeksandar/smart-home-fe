import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todayData: null,
    monthData: null,
    selectedMonth: null,
    lastValue: null,
    error: false
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_METEO_DATA:
            return {
                ...state,
                todayData: action.todayData,
                lastValue: action.lastValue,
                error: false
            };
        case actionTypes.FETCH_METEO_DATA_FAILED:
            return {
                ...state,
                error: true
            };
        case actionTypes.SET_MONTH_DATA:
            return {
                ...state,
                monthData: action.monthData,
                selectedMonth: action.selectedMonth
            };
        case actionTypes.FETCH_MONTH_DATA_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;