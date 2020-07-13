import * as actionTypes from '../actions/actionTypes';

const initialState = {
    meteoData: null,
    todayData: null,
    monthData: null,
    selectedMonth: 0,
    lastValue: null,
    error: false
};

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_METEO_DATA:
            return {
                ...state,
                meteoData: action.meteoData,
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
        default:
            return state;
    }
};

export default reducer;