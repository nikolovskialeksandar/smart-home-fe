import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import DayView from '../../components/DayView/DayView';
import MonthView from '../../components/MonthView/MonthView';
import YearView from '../../components/YearView/YearView';
import Dashboard from '../../components/Dashboard/Dashboard';
import Logout from '../Auth/Logout/Logout';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import * as actionCreators from '../../store/actions/index';

const Layout = (props) => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);
  useEffect(() => {
    props.initMeteoData(props.token);
    props.initSonoffData(props.token);
  }, []);

  const sideDrawerShow = () => {
    const updatedState = sideDrawerVisible;
    setSideDrawerVisible(!updatedState);
  };

  const closeSideDrawer = () => {
    setSideDrawerVisible(false);
  };

  return (
    <div className="layout">
      <Navbar clicked={sideDrawerShow} show={!sideDrawerVisible} desktopOnly />
      <SideDrawer show={sideDrawerVisible} closeSideDrawer={closeSideDrawer} />
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route
          path="/day"
          render={() => (
            <DayView
              dayData={props.dayData}
              selectedDay={props.selectedDay}
              fetchDayData={(date) => props.fetchDayData(props.token, date)}
            />
          )}
        />
        <Route
          path="/month"
          render={() => (
            <MonthView
              monthData={props.monthData}
              selectedMonth={props.selectedMonth}
              calculateMonthData={(event) => props.calculateMonthData(props.token, event)}
            />
          )}
        />
        <Route
          path="/year"
          render={() => (
            <YearView
              yearData={props.yearData}
              selectedYear={props.selectedYear}
              calculateYearData={(event) => props.calculateYearData(props.token, event)}
            />
          )}
        />
        <Route
          path="/"
          render={() => (
            <Dashboard
              todayData={props.todayData}
              lastValue={props.lastValue}
              sonoffState={props.sonoffState}
              sonoffSwitch={() => props.sendSonoffData(props.sonoffState, props.token)}
            />
          )}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    todayData: state.meteo.todayData,
    lastValue: state.meteo.lastValue,
    monthData: state.month.monthData,
    selectedMonth: state.month.selectedMonth,
    yearData: state.year.yearData,
    selectedYear: state.year.selectedYear,
    dayData: state.day.dayData,
    selectedDay: state.day.selectedDay,
    sonoffState: state.sonoff.sonoffState,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initMeteoData: (token) => dispatch(actionCreators.initMeteoData(token)),
    initSonoffData: (token) => dispatch(actionCreators.initSonoffData(token)),
    sendSonoffData: (sonoffState, token) =>
      dispatch(actionCreators.sendSonoffData(sonoffState, token)),
    calculateMonthData: (token, event) =>
      dispatch(actionCreators.calculateMonthData(token, event)),
    calculateYearData: (token, year) =>
      dispatch(actionCreators.calculateYearData(token, year)),
    fetchDayData: (token, date) => dispatch(actionCreators.fetchDayData(token, date)),
  };
};

Layout.propTypes = {
  todayData: PropTypes.array,
  lastValue: PropTypes.object,
  sonoffState: PropTypes.bool,
  monthData: PropTypes.array,
  selectedMonth: PropTypes.string,
  yearData: PropTypes.array,
  selectedYear: PropTypes.string,
  dayData: PropTypes.array,
  token: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
