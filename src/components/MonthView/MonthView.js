import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './MonthView.css';
import ChartContainer from '../ChartContainer/ChartContainer';
import Navbar from '../Navigation/Navbar/Navbar';

const MonthView = (props) => {
  const [selectedYear, setSelectedYear] = useState();
  const yearList = ['2025', '2024', '2023', '2022', '2021', '2020'];
  const monthList = [
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
        <h2>{`${monthList[props.selectedMonth]} values`}</h2>
        <ChartContainer data={props.monthData} charType="line" />
      </React.Fragment>
    );
  } else if (props.selectedMonth && props.monthData === null) {
    monthCharts = <p className="no-data">No data</p>;
  }

  return (
    <main className="month-view">
      <Navbar navbar2 />
      <form>
        <select
          defaultValue="default"
          onChange={(event) => setSelectedYear(event.target.value)}
        >
          <option value="default" disabled hidden>
            Select year
          </option>
          {yearList.map((year) => (
            <option value={year}>{year}</option>
          ))}
        </select>
        <select
          defaultValue="default"
          onChange={(event) => props.calculateMonthData(event.target.value, selectedYear)}
        >
          <option value="default" disabled hidden>
            Select month
          </option>
          {monthList.map((month, index) => (
            <option value={index}>{month}</option>
          ))}
        </select>
      </form>
      {monthCharts}
    </main>
  );
};

MonthView.propTypes = {
  monthData: PropTypes.array,
  selectedMonth: PropTypes.string,
  calculateMonthData: PropTypes.func,
};

export default MonthView;
