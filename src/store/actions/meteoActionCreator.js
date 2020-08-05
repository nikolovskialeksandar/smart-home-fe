import axios from 'axios';

import * as actionTypes from './actionTypes';
require('dotenv').config();

const twoDigitsTimeFormater = (val) => {
    val = val.toString();
    if (val.length === 1) {
        val = '0' + val;
    }

    return val;
};

const time = new Date();
const year = time.getFullYear();
const month = time.getMonth() + 1;
const day = time.getDate();

export const setMeteoData = (todayData, lastValue) => {
    return {
        type: actionTypes.SET_METEO_DATA,
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

export const setMonthData = (monthData, selectedMonth) => {
    return {
        type: actionTypes.SET_MONTH_DATA,
        monthData: monthData,
        selectedMonth: selectedMonth
    };
};

export const fetchMonthDataFailed = (error) => {
    return {
        type: actionTypes.FETCH_MONTH_DATA_FAILED,
        error: error
    };
};

export const initMeteoData = (token) => {
    const url = process.env.REACT_APP_FIREBASE_PROJECT_ID + '/meteoData/' + year + '/' + month + '/' + day + '.json?auth=' + token;
    return dispatch => {
        axios.get(url)
            .then((response) => {
                const todayData = Object.keys(response.data).map((key) => {
                    const date = new Date(response.data[key].time);
                    return {
                        temperature: response.data[key].temperature,
                        humidity: response.data[key].humidity,
                        light: response.data[key].light,
                        time: twoDigitsTimeFormater(date.getHours()) + ':' + twoDigitsTimeFormater(date.getMinutes()),
                        date: twoDigitsTimeFormater(date.getDate()) + '.' + twoDigitsTimeFormater(date.getMonth() + 1)
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

export const calculateMonthData = (token, event) => {
    return dispatch => {
        const selectedMonth = event.target.value;
        const url = process.env.REACT_APP_FIREBASE_PROJECT_ID + '/meteoData/' + year + '/' + (+event.target.value + 1 ) + '.json?auth=' + token;
        axios.get(url)
            .then((response) => {
                let monthDataArray  = [];
                if(response.data) {
                    let monthData = Object.keys(response.data).map((val) => {
                        return response.data[val]; 
                    });

                    monthData = monthData.filter((val) => {
                        return val !== null;
                    });
                    
                    let averageTemp, averageHumid, averageLight, maxTemp, minTemp, maxHumid, minHumid, dataCounter, time;
                    averageTemp = averageHumid = averageLight = maxTemp = minTemp = maxHumid = minHumid = dataCounter = 0;
                    monthData.map((val) => {
                        for(const key in val) {
                            if(dataCounter === 0) {
                                const date = new Date((val[key].time));
                                time = twoDigitsTimeFormater(date.getDate()) + '.' + twoDigitsTimeFormater(date.getMonth() + 1);
                                minTemp = val[key].temperature;
                                maxTemp = val[key].temperature;
                                minHumid = val[key].humidity;
                                maxHumid = val[key].humidity;
                            } 
                            
                            else if (val[key].temperature > maxTemp) {
                                maxTemp = val[key].temperature;
                            }
            
                            else if (val[key].temperature < minTemp) {
                                minTemp = val[key].temperature;
                            }
            
                            else if (val[key].humidity > maxHumid) {
                                maxHumid = val[key].humidity;
                            }
            
                            else if (val[key].humidity < minHumid) {
                                minHumid = val[key].humidity;
                            }
    
                            averageTemp += val[key].temperature;
                            averageHumid += val[key].humidity;
                            averageLight += val[key].light;
                            dataCounter ++;
                        }
    
                        monthDataArray.push({
                            temperature: (averageTemp / dataCounter).toFixed(1),
                            humidity: (averageHumid / dataCounter).toFixed(1),
                            light: (averageLight / dataCounter).toFixed(1),
                            time: time,
                            maxTemp: maxTemp.toFixed(1),
                            minTemp: minTemp.toFixed(1),
                            minHumid: minHumid.toFixed(1),  
                            maxHumid: maxHumid.toFixed(1)
                        });
    
                        averageTemp = averageHumid = averageLight = maxTemp = minTemp = maxHumid = minHumid = dataCounter = 0; 
                    })
                }
                
                else {
                    monthDataArray = null;
                }

                dispatch(setMonthData(monthDataArray, selectedMonth));
            })
            .catch((error) => {
                dispatch(fetchMonthDataFailed(error))
            })
    };
};

