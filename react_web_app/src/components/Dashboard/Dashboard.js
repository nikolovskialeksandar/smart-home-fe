import React from 'react';

import './Dashboard.css';
import SensorChart from '../SensorChart/SensorChart';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import Navbar from '../Navigation/Navbar/Navbar';

const dashboard = (props) => {
	let current = <Spinner />;
	if(props.lastValue) {
		current = (
			<div className="current-data">
				<p>Temperature: {props.lastValue.temperature +' C'}</p>
				<p>Humidity: {props.lastValue.humidity + ' %'}</p>
				<p>Light: {props.lastValue.light + ' lux'}</p>
				<p>Time: {props.lastValue.time.getHours() + ':' + props.lastValue.time.getMinutes()}</p> 
			</div>
		);
	}

    return (
        <div className="dashboard">
			<Navbar navbar2 />
			{current}
			<Button 
				buttonType="switch" 
				sonoffSwitch={props.sonoffSwitch} 
				sonoffState={props.sonoffState} 
			/>
			<SensorChart
				data={props.todayData} 
				dataKey="temperature" 
				color="#F44336"
				charType='area' 
			/>
			<SensorChart 
				data={props.todayData} 
				dataKey="humidity" 
				color="#4FC3F7"
				charType='area' 	
			/>
			<SensorChart 
				data={props.todayData} 
				dataKey="light" 
				color="#FFD54F"
				charType='area' 	
			/>
        </div>
    );
};

export default dashboard; 