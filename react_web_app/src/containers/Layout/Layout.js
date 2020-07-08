import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import './Layout.css';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import MonthView from '../../components/MonthView/MonthView';
import Dashboard from '../../components/Dashboard/Dashboard';
import Auth from '../Auth/Auth';
import * as actionCreators from '../../store/actions/index';

const Layout = props => {
	useEffect(() => {
		props.initMeteoData();
		props.initSonoffData();
	}, []);

	return (
		<main className="layout">
			<Navbar />
			<Switch>
				<Route path="/auth" component={Auth} />
				<Route path="/month" render={() => (
					<MonthView
						monthData={props.monthData} 
						selectedMonth={props.selectedMonth}
						calculateMonthData={props.calculateMonthData}
					/>
				)} />
				<Route path="/" exact render={() => (
					<Dashboard 
						todayData={props.todayData}
						lastValue={props.lastValue}
						sonoffState={props.sonoffState}
						sendSonoffData={props.sendSonoffData}
					/>
				)} />
			</Switch>
		</main>
	);
}

const mapStateToProps = (state) => {
	return {
		monthData: state.meteo.monthData,
		todayData: state.meteo.todayData,
		lastValue: state.meteo.lastValue,
		sonoffState: state.sonoff.sonoffState,
		selectedMonth: state.meteo.selectedMonth
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		initMeteoData: () => dispatch(actionCreators.initMeteoData()),
		initSonoffData:() => dispatch(actionCreators.initSonoffData()),
		sendSonoffData:(sonoffState) => dispatch(actionCreators.sendSonoffData(sonoffState)),
		calculateMonthData:(event) => dispatch(actionCreators.calculateMonthData(event)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout); 