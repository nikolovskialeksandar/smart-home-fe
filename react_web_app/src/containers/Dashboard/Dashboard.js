import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './Dashboard.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SensorOutput from '../../components/SensorOutput/SensorOutput';
import Button from '../../components/UI/Button/Button';
require('dotenv').config();

const Dashboard = (props) => {
	const [meteoData, setMeteoData] = useState([]);
	const [lastValue, setLastValue] = useState({});
	const [todayData, setTodayData] = useState([]);
	const [sonoffState, setSonoffState] = useState();

	useEffect(() => {
		console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID);
		axios.get(process.env.REACT_APP_FIREBASE_PROJECT_ID + '/meteoData.json')
			.then((response) => {
				let updatedState = Object.keys(response.data).map(key => {
					return {
						...response.data[key]
					}
				});
				let lastValue = updatedState[updatedState.length - 1];
				let today = updatedState.slice(-144);
				today = today.map(val => {
					return {
						temperature: val.temperature,
						humidity: val.humidity,
						time: val.time.slice(10, 16)
					}
				})
				setMeteoData(updatedState);
				setLastValue(lastValue);
				setTodayData(today);
				console.log(today);
				console.log(lastValue.time.slice(10, 16));
			})
			.catch(error => {
				console.log(error);
			})	
	}, []);

	useEffect(() => {
		axios.get(process.env.REACT_APP_FIREBASE_PROJECT_ID + '/sonoff.json')
			.then((response) => {
				console.log(response.data)
				setSonoffState(response.data.sonoffSwitch);
			})
			.catch(error => {
				console.log(error);
			})
	}, [sonoffState]);

	let sonoffSwitch = () => {
		let newSonoffState = {sonoffSwitch: !sonoffState};
		setSonoffState(newSonoffState);
		axios.put(process.env.REACT_APP_FIREBASE_PROJECT_ID + '/sonoff.json', newSonoffState);
	}

	return (
		<main className="dashboard">
			<Toolbar />
			<div className="current-data">
				<p>Temperature: {lastValue.temperature +' C'}</p>
				<p>Humidity: {lastValue.humidity + ' %'}</p>
				<p>Time: {lastValue.time}</p>
			</div>
			<Button sonoffSwitch={sonoffSwitch} sonoffState={sonoffState}/>
			<SensorOutput
				todayData={todayData} 
				dataKey="temperature" 
				color="#F44336" 
			/>
			<SensorOutput 
				todayData={todayData} 
				dataKey="humidity" 
				color="#4FC3F7" 	
			/>
		</main>
	);
}

export default Dashboard; 