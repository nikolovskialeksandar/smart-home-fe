import axios from 'axios';

import * as actionTypes from './actionTypes';

require('dotenv').config();

export const setSonoffData = (sonoffState) => {
  return {
    type: actionTypes.SET_SONOFF_DATA,
    sonoffState,
  };
};

export const setSonoffDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_SONOFF_DATA_FAILED,
    error,
  };
};

export const initSonoffData = (token) => {
  return (dispatch) => {
    axios
      .get(
        `${process.env.REACT_APP_FIREBASE_PROJECT_ID}/sonoff.json?auth=${token}`,
      )
      .then((response) => {
        dispatch(setSonoffData(response.data.sonoffSwitch));
      })
      .catch((error) => {
        dispatch(setSonoffDataFailed(error));
      });
  };
};

export const sendSonoffDataFailed = (error) => {
  return {
    type: actionTypes.SEND_SONOFF_DATA_FAILED,
    error,
  };
};

export const sendSonoffData = (sonoffState, token) => {
  return (dispatch) => {
    axios
      .put(
        `${process.env.REACT_APP_FIREBASE_PROJECT_ID}/sonoff.json?auth=${token}`,
        { sonoffSwitch: !sonoffState },
      )
      .then(() => {
        dispatch(initSonoffData(token));
      })
      .catch((error) => {
        dispatch(sendSonoffDataFailed(error));
      });
  };
};
