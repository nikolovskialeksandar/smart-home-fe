import React from 'react';

import './MonthView.css';
import SensorChart from '../SensorChart/SensorChart';
import Navbar from '../Navigation/Navbar/Navbar';

const monthView = props => {
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
		<p>No data</p>;

	let showSelectedMonth = '';
	switch (+props.selectedMonth) {
		case 0:
			showSelectedMonth = 'January';
			break;
		case 1:
			showSelectedMonth = 'February';
			break;
		case 2:
			showSelectedMonth = 'March';
			break;
		case 3:
			showSelectedMonth = 'April';
			break;
		case 4:
			showSelectedMonth = 'May';
			break;
		case 5:
			showSelectedMonth = 'June';
			break;
		case 6:
			showSelectedMonth = 'July';
			break;
		case 7:
			showSelectedMonth = 'August';
			break;
		case 8:
			showSelectedMonth = 'September';
			break;
		case 9:
			showSelectedMonth = 'October';
			break;
		case 10:
			showSelectedMonth = 'November';
			break;
		case 11:
			showSelectedMonth = 'December';
			break;
		default:
			showSelectedMonth = null;
	}

    return (
        <div className="month-view">
			<Navbar navbar2 />
            <form>
				<select onChange={props.calculateMonthData}>
					<option value="0">January</option>
					<option value="1">February</option>
					<option value="2">March</option>
					<option value="3">April</option>
					<option value="4">May</option>
					<option value="5">June</option>
					<option value="6">July</option>
					<option value="7">August</option>
					<option value="8">September</option>
					<option value="9">October</option>
					<option value="10">November</option>
					<option value="11">December</option>
				</select>
			</form>
			<h2>{showSelectedMonth} values</h2>
            {monthView}
        </div>
    );
};

export default monthView;