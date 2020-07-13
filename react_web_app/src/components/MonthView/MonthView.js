import React from 'react';

import './MonthView.css';
import SensorChart from '../SensorChart/SensorChart';
import Navbar from '../Navigation/Navbar/Navbar';

const monthView = (props) => {
	let monthView = props.monthData !== [] && props.monthData !== null ? 
		<div>			
			<SensorChart
				data={props.monthData} 
				dataKey="temperature" 
				color="#F44336"
				charType='line' 
			/>
			<SensorChart
				data={props.monthData} 
				dataKey="humidity" 
				color="#4FC3F7"
				charType='line' 	
			/> 
			<SensorChart 
				data={props.monthData} 
				dataKey="light" 
				color="#FFD54F"
				charType='line' 
			/> 
		</div> : 
		<p className="no-data">No data</p>;

	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div className="month-view">
			<Navbar navbar2 />
            <form>
				<select onChange={props.calculateMonthData}>
					{monthNames.map((month, index) => <option value={index}>{month}</option>)}
				</select>
			</form>
			<h2>{monthNames[props.selectedMonth]} values</h2>
            {monthView}
        </div>
    );
};

export default monthView;