import axios from 'axios';

import * as actionTypes from './actionTypes';
require('dotenv').config();

export const setSonoffData = (sonoffState) => {
    return {
        type: actionTypes.SET_SONOFF_DATA,
        sonoffState: sonoffState
    };
};

export const fetchSonoffDataFailed = (error) => {
    return {
        type: actionTypes.FETCH_SONOFF_DATA_FAILED,
        error: error
    }
};

export const sendSonoffDataFailed = (error) => {
    return {
        type: actionTypes.SEND_SONOFF_DATA_FAILED,
        error: error
    }
};

export const sendSonoffData = (sonoffState) => {
    return dispatch => {
        axios.put(process.env.REACT_APP_FIREBASE_PROJECT_ID + '/sonoff.json', {sonoffSwitch: !sonoffState})
        .then(() => {
            dispatch(initSonoffData());
        })
        .catch((error) => {
            dispatch(sendSonoffDataFailed(error));
        })
    }
};

export const initSonoffData = () => {
    return dispatch => {
        axios.get(process.env.REACT_APP_FIREBASE_PROJECT_ID + '/sonoff.json')
        .then((response) => {
            dispatch(setSonoffData(response.data.sonoffSwitch));
        })
        .catch(error => {
            dispatch(fetchSonoffDataFailed(error));
        })
    }
};