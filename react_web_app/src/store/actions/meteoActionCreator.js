import axios from 'axios';

import * as actionTypes from './actionTypes';
require('dotenv').config();

export const setMeteoData = (meteoData, todayData, lastValue) => {
    return {
        type: actionTypes.SET_METEO_DATA,
        meteoData: meteoData,
        todayData: todayData,
        lastValue: lastValue
    };
};

export const fetchMeteoDataFailed = (error) => {
    return {
        type: actionTypes.FETCH_METEO_DATA_FAILED,
        error: error
    };
};

export const initMeteoData = (token) => {
    return dispatch => {
        axios.get(process.env.REACT_APP_FIREBASE_PROJECT_ID + '/meteoData.json?auth=' + token)
            .then((response) => {
                const meteoData = Object.keys(response.data).map((key) => {
                    return {
                        temperature: response.data[key].temperature,
                        humidity: response.data[key].humidity,
                        light: response.data[key].light,
                        time: new Date(response.data[key].time)
                    };
                });
                const todayData = meteoData.slice(-144)
                    .map((val) => {
                        return {
                            temperature: val.temperature,
                            humidity: val.humidity,
                            light: val.light,
                            time: val.time.getHours() + ':' + val.time.getMinutes()
                        }
                    });
                const lastValue = meteoData[meteoData.length - 1];
                dispatch(setMeteoData(meteoData, todayData, lastValue));
            })
            .catch((error) => {
                dispatch(fetchMeteoDataFailed(error));
                console.log(error);
            });	
    };
};

export const setMonthData = (monthData, selectedMonth) => {
    return {
        type: actionTypes.SET_MONTH_DATA,
        monthData: monthData,
        selectedMonth: selectedMonth
    };
};

export const calculateMonthData = (meteoData, event) => {
    return dispatch => {
        let month = meteoData.filter(val => val.time.getMonth() === +event.target.value);
        let day = 1;
        let selectedMonth = event.target.value;
        let monthData  = [];
        let averageTemp, averageHumid, averageLight, maxTemp, minTemp, maxHumid, minHumid, dataCounter;
        averageTemp = averageHumid = averageLight = maxTemp = minTemp = maxHumid = minHumid = dataCounter = 0;
		for(let i = 0; i < month.length; i++) {
			if(month[i].time.getDate() === day) {
				averageTemp += month[i].temperature;
                averageHumid += month[i].humidity;
                averageLight += month[i].light;
                dataCounter ++;
                if(dataCounter === 1) {
                    minTemp = month[i].temperature;
                    maxTemp = month[i].temperature;
                    minHumid = month[i].humidity;
                    maxHumid = month[i].humidity;
                }

                else if (month[i].temperature > maxTemp) {
                    maxTemp = month[i].temperature;
                }

                else if (month[i].temperature < minTemp) {
                    minTemp = month[i].temperature;
                }

                else if (month[i].humidity > maxHumid) {
                    maxHumid = month[i].humidity;
                }

                else if (month[i].humidity < minHumid) {
                    minHumid = month[i].humidity;
                }
            }
            
			else {
				day = month[i].time.getDate();
				monthData.push({
					temperature: (averageTemp / dataCounter).toFixed(1),
                    humidity: (averageHumid / dataCounter).toFixed(1),
                    light: (averageLight / dataCounter).toFixed(1),
                    time: month[i].time.getDate() + '.' + month[i].time.getMonth(),
                    maxTemp: maxTemp.toFixed(1),
                    minTemp: minTemp.toFixed(1),
                    minHumid: minHumid.toFixed(1),
                    maxHumid: maxHumid.toFixed(1)
                });
                
				averageTemp = averageHumid = averageLight = maxTemp = minTemp = maxHumid = minHumid = dataCounter = 0; 
            }
        };
        dispatch(setMonthData(monthData, selectedMonth));
    };
};

