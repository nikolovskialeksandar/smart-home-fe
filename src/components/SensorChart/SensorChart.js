import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import './SensorChart.css';
import Spinner from '../UI/Spinner/Spinner';

const sensorChart = (props) => {
    const sensorName = props.dataKey.charAt(0).toUpperCase() + props.dataKey.substring(1);
    let sensorClass;
    switch (props.dataKey) {
        case 'temperature':
            sensorClass = 'fas fa-temperature-high';
            break;
        case 'humidity':
            sensorClass = 'fas fa-tint';
            break;
        case 'light':
            sensorClass = 'fas fa-sun';
            break;
        default:
            sensorClass = 'fas fa-sun';
            break;
    }
    
    const CustomTooltip = ({ active, payload, label }) => {
		if (active) {
            if(payload === [] || payload === null) {
                return null;
            }

            switch (props.dataKey) {
                case 'temperature':
                    return (
                        <div className="custom-tooltip">
                            <p>Avg. Temp: <span className="avg">{`${payload[0].payload.temperature }`}</span></p>
                            <p>Max. Temp: <span className="max">{`${payload[0].payload.maxTemp}`}</span></p>
                            <p>Min. Temp: <span className="min">{`${payload[0].payload.minTemp}`}</span></p>
                            <p>Date: {`${payload[0].payload.time}`}</p>
                        </div>
                    );
                case 'humidity':
                    return (
                        <div className="custom-tooltip">
                            <p>Avg. Humidity: <span className="avg">{`${payload[0].payload.humidity}`}</span> </p>
                            <p>Max. Humidity: <span className="max">{`${payload[0].payload.maxHumid}`}</span> </p>
                            <p>Min. Humidity: <span className="min">{`${payload[0].payload.minHumid}`}</span> </p>
                            <p>Date: {`${payload[0].payload.time}`}</p>
                        </div>
                    );
                case 'light':
                    return (
                        <div className="custom-tooltip">
                            <p>Avg. Light: <span className="avg">{`${payload[0].payload.light}`}</span> </p>
                            <p>Date: {`${payload[0].payload.time}`}</p>
                        </div>
                    );
                default:
                    return null;
            }
        }
        
		return null;
    };

    let chartType = props.charType;
    let chart = <Spinner />;
    if (chartType === 'area') {
        chart = (
            <ResponsiveContainer >
                <AreaChart  data={props.data} >
                    <CartesianGrid strokeDasharray="1 4" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey={props.dataKey} stroke={props.color} fill={props.color}/>
                </AreaChart>
            </ResponsiveContainer>
        );
    }

    else if (chartType === 'line') {
        chart = (
            <ResponsiveContainer>
                <LineChart data={props.data}>
                    <CartesianGrid strokeDasharray="1 4" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Line type="monotone" dataKey={props.dataKey} stroke={props.color} />
                    <Tooltip content={<CustomTooltip />}/>
                </LineChart>
            </ResponsiveContainer>
        );
    }

    return (
        <div className="sensor-output">
            <h3>{sensorName} <i className={sensorClass}></i></h3>
            {chart}
        </div> 
    );
};

sensorChart.propTypes = {
	data: PropTypes.array,
	dataKey: PropTypes.string.isRequired,
	color: PropTypes.string,
	charType: PropTypes.string.isRequired	
};

export default sensorChart;

