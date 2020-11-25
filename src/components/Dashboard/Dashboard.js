import React from 'react';
import PropTypes from 'prop-types';

import './Dashboard.css';
import ChartContainer from '../ChartContainer/ChartContainer';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import Navbar from '../Navigation/Navbar/Navbar';

const dashboard = (props) => {
  let current = <Spinner />;
  if (props.lastValue) {
    current = (
      <div className="current-data">
        <p>Temperature: {`${props.lastValue.temperature} C`}</p>
        <p>Humidity: {`${props.lastValue.humidity} %`}</p>
        <p>Light: {`${props.lastValue.light} lux`}</p>
        <p>Time: {props.lastValue.time}</p>
      </div>
    );
  }

  return (
    <main className="dashboard">
      <Navbar navbar2 />
      {current}
      <div className="switch">
        <p>
          Light &nbsp;
          <i className="far fa-lightbulb" />
        </p>
        <Button
          styleClasses={props.sonoffState ? ['success'] : ['danger']}
          onClick={props.sonoffSwitch}
          name={props.sonoffState ? 'ON' : 'OFF'}
        />
      </div>
      <ChartContainer data={props.todayData} charType="area" />
    </main>
  );
};

dashboard.propTypes = {
  todayData: PropTypes.array,
  lastValue: PropTypes.object,
  sonoffState: PropTypes.bool,
  sonoffSwitch: PropTypes.func,
};

export default dashboard;
