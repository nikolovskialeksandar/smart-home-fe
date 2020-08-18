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
				<p>Time: {props.lastValue.time}</p> 
			</div>
		);
	}

    return (
        <main className="dashboard">
			<Navbar navbar2 />
			{current}
			<div className="switch">
				<p>Light &nbsp;<i className="far fa-lightbulb"></i></p>
				<Button 
					styleClasses={props.sonoffState ? ['success'] : ['danger']}
					onClick={props.sonoffSwitch}
					name={props.sonoffState ? 'ON' : 'OFF'} 
				/>
			</div>
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
        </main>
    );
};

export default dashboard; 