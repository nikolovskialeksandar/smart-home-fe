import axios from 'axios';

import * as actionTypes from './actionTypes';

require('dotenv').config();

const twoDigitsTimeFormater = (val) => {
  let twoDigits = val.toString();
  if (twoDigits.length === 1) {
    twoDigits = `0${val}`;
  }

  return twoDigits;
};

const currentTime = new Date();
const year = currentTime.getFullYear();
const month = currentTime.getMonth() + 1;
const day = currentTime.getDate();

export const setMeteoData = (todayData, lastValue) => {
  return {
    type: actionTypes.SET_METEO_DATA,
    todayData,
    lastValue,
  };
};

export const fetchMeteoDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_METEO_DATA_FAILED,
    error,
  };
};

export const initMeteoData = (token) => {
  const url = `${process.env.REACT_APP_FIREBASE_PROJECT_ID}/meteoData/${year}/${month}/${day}.json?auth=${token}`;
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => {
        const todayData = Object.keys(response.data).map((key) => {
          const date = new Date(response.data[key].time);
          return {
            temperature: response.data[key].temperature,
            humidity: response.data[key].humidity,
            light: response.data[key].light,
            time: `${twoDigitsTimeFormater(date.getHours())}:${twoDigitsTimeFormater(
              date.getMinutes(),
            )}`,
            date: `${twoDigitsTimeFormater(date.getDate())}.${twoDigitsTimeFormater(
              date.getMonth() + 1,
            )}`,
          };
        });

        const lastValue = todayData[todayData.length - 1];
        dispatch(setMeteoData(todayData, lastValue));
      })
      .catch((error) => {
        dispatch(fetchMeteoDataFailed(error));
      });
  };
};