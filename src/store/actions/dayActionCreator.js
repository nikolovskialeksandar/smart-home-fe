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

export const setDayData = (dayData, selectedDay) => {
  return {
    type: actionTypes.SET_DAY_DATA,
    dayData: dayData,
    selectedDay: selectedDay,
  };
};

export const fetchDayDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_DAY_DATA_FAILED,
    error: error,
  };
};

export const fetchDayData = (token, date) => {
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  const urlDate = `${yyyy}/${mm}/${dd}`;

  return (dispatch) => {
    const url = `${process.env.REACT_APP_FIREBASE_PROJECT_ID}/meteoData/${urlDate}.json?auth=${token}`;
    axios
      .get(url)
      .then((response) => {
        const dayData = Object.keys(response.data).map((key) => {
          const time = new Date(response.data[key].time);
          return {
            temperature: response.data[key].temperature,
            humidity: response.data[key].humidity,
            light: response.data[key].light,
            time: `${twoDigitsTimeFormater(time.getHours())}:${twoDigitsTimeFormater(
              time.getMinutes(),
            )}`,
          };
        });
        dispatch(setDayData(dayData, date));
      })
      .catch((error) => {
        dispatch(fetchDayDataFailed(error));
      });
  };
};
