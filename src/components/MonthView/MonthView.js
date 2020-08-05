import React from 'react';

import './MonthView.css';
import SensorChart from '../SensorChart/SensorChart';
import Navbar from '../Navigation/Navbar/Navbar';

const monthView = (props) => {
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	let monthView = props.monthData !== [] && props.monthData !== null ? (
		<div>
			<h2>{monthNames[props.selectedMonth] + ' values'}</h2>			
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
		</div>
	) : 
		props.selectedMonth ? <p className="no-data">No data</p> : null;

    return (
        <div className="month-view">
			<Navbar navbar2 />
            <form>
				<select  defaultValue={'default' }onChange={props.calculateMonthData}>
					<option value="default" disabled hidden>Select month</option>
					{monthNames.map((month, index) => <option value={index}>{month}</option>)}
				</select>
				{monthView}
			</form>
        </div>
    );
};

export default monthView;