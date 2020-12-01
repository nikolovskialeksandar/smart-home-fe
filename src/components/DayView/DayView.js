import React from 'react';
import PropTypes from 'prop-types';

import 'flatpickr/dist/themes/dark.css';
import './DayView.css';
import Flatpickr from 'react-flatpickr';

import Navbar from '../Navigation/Navbar/Navbar';
import ChartContainer from '../ChartContainer/ChartContainer';

const DayView = (props) => {
  let dayCharts = null;

  if (props.dayData !== [] && props.dayData !== null) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const dateDisplay = (
      <h2>
        {`${
          days[props.selectedDay.getDay()]
        }, ${props.selectedDay.getDate()}.${props.selectedDay.getMonth()}.${props.selectedDay.getFullYear()}.`}
      </h2>
    );

    dayCharts = (
      <React.Fragment>
        {dateDisplay}
        <ChartContainer data={props.dayData} charType="area" />
      </React.Fragment>
    );
  } else if (props.selectedDay && props.dayData === null) {
    dayCharts = <p className="no-data"> No data</p>;
  }
  return (
    <main className="day-view">
      <Navbar navbar2 />
      <Flatpickr
        onChange={(event) => props.fetchDayData(event[0])}
        defaultValue="Select date"
      />
      {dayCharts}
    </main>
  );
};

DayView.propTypes = {
  dayData: PropTypes.array,
  selectedDay: PropTypes.object,
  fetchDayData: PropTypes.func,
};

export default DayView;
