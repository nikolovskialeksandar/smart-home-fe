import React from 'react';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './SensorOutput.css';


const sensorOutput = (props) => {
	const sensorName = props.dataKey.charAt(0).toUpperCase() + props.dataKey.substring(1);
	
	return (
		<div className="sensor-output">
			<h3>{sensorName}  <i class={props.dataKey === "temperature" ? "fas fa-temperature-high" : "fas fa-tint" }></i></h3>
			<AreaChart
				width={700}
				height={400}
				data={props.todayData}
				margin={{
				top: 10, right: 30, left: 0, bottom: 0,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="time" />
				<YAxis />
				<Tooltip />
				<Area type="monotone" dataKey={props.dataKey} stroke={props.color} fill={props.color}/>
			</AreaChart>
		</div>
	);
}

export default sensorOutput;