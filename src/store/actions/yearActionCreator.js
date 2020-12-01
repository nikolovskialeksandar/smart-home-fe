import axios from 'axios';

import * as actionTypes from './actionTypes';

require('dotenv').config();

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const setYearData = (yearData, selectedYear) => {
  return {
    type: actionTypes.SET_YEAR_DATA,
    yearData: yearData,
    selectedYear: selectedYear,
  };
};

export const fetchYearDataFailed = (error) => {
  return {
    type: actionTypes.FETCH_YEAR_DATA_FAILED,
    error,
  };
};

export const calculateYearData = (token, event) => {
  const selectedYear = event.target.value;
  return (dispatch) => {
    const url = `${process.env.REACT_APP_FIREBASE_PROJECT_ID}/meteoData/${selectedYear}.json?auth=${token}`;
    axios
      .get(url)
      .then((response) => {
        let yearData = [];
        if (response.data) {
          response.data
            // Filter and iterate months
            .filter((month) => {
              return month !== null;
            })
            .forEach((filteredMonth) => {
              let averageTemp,
                averageHumid,
                averageLight,
                maxTemp,
                minTemp,
                maxHumid,
                minHumid,
                dataCounter,
                month;
              averageTemp = averageHumid = averageLight = maxTemp = minTemp = maxHumid = minHumid = dataCounter = 0;
              filteredMonth
                // Filter and iterate days
                .filter((day) => {
                  return day !== null;
                })
                .forEach((filteredDay) => {
                  // Iterate data for single day
                  Object.keys(filteredDay).forEach((key) => {
                    if (dataCounter === 0) {
                      const date = new Date(filteredDay[key].time);
                      month = monthNames[date.getMonth()];
                      minTemp = filteredDay[key].temperature;
                      maxTemp = filteredDay[key].temperature;
                      minHumid = filteredDay[key].humidity;
                      maxHumid = filteredDay[key].humidity;
                    } else if (filteredDay[key].temperature > maxTemp) {
                      maxTemp = filteredDay[key].temperature;
                    } else if (filteredDay[key].temperature < minTemp) {
                      minTemp = filteredDay[key].temperature;
                    } else if (filteredDay[key].humidity > maxHumid) {
                      maxHumid = filteredDay[key].humidity;
                    } else if (filteredDay[key].humidity < minHumid) {
                      minHumid = filteredDay[key].humidity;
                    }

                    averageTemp += filteredDay[key].temperature;
                    averageHumid += filteredDay[key].humidity;
                    averageLight += filteredDay[key].light ? filteredDay[key].light : 0;
                    dataCounter++;
                  });
                });

              yearData.push({
                temperature: +(averageTemp / dataCounter).toFixed(1),
                humidity: +(averageHumid / dataCounter).toFixed(1),
                light: +(averageLight / dataCounter).toFixed(1),
                maxTemp: +maxTemp.toFixed(1),
                minTemp: +minTemp.toFixed(1),
                minHumid: +minHumid.toFixed(1),
                maxHumid: +maxHumid.toFixed(1),
                month: month,
                dataCounter: dataCounter,
              });
              averageTemp = averageHumid = averageLight = maxTemp = minTemp = maxHumid = minHumid = dataCounter = 0;
            });
        } else {
          yearData = null;
        }
        dispatch(setYearData(yearData, selectedYear));
      })
      .catch((error) => {
        dispatch(fetchYearDataFailed(error));
      });
  };
};
