import React from 'react';
import PropTypes from 'prop-types';

import './MonthView.css';
import SensorContainer from '../SensorContainer/SensorContainer';
import Navbar from '../Navigation/Navbar/Navbar';

const monthView = (props) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let monthCharts = null;
  if (props.monthData !== [] && props.monthData !== null) {
    monthCharts = (
      <React.Fragment>
        <h2>{`${monthNames[props.selectedMonth]} values`}</h2>
        <SensorContainer data={props.monthData} charType="line" />
      </React.Fragment>
    );
  } else if (props.selectedMonth) {
    monthCharts = <p className="no-data">No data</p>;
  }

  return (
    <main className="month-view">
      <Navbar navbar2 />
      <form>
        <select defaultValue="default" onChange={props.calculateMonthData}>
          <option value="default" disabled hidden>
            Select month
          </option>
          {monthNames.map((month, index) => (
            <option value={index}>{month}</option>
          ))}
        </select>
        {monthCharts}
      </form>
    </main>
  );
};

monthView.propTypes = {
  monthData: PropTypes.array,
  selectedMonth: PropTypes.string,
  calculateMonthData: PropTypes.func,
};

export default monthView;
