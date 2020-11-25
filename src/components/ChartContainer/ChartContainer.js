import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ChartContainer.css';
import Chart from '../Chart/Chart';

const ChartContainer = (props) => {
  const [sensorTypes] = useState({
    temperature: {
      dataKey: 'temperature',
      color: '#F44336',
    },
    humidity: {
      dataKey: 'humidity',
      color: '#4FC3F7',
    },
    light: {
      dataKey: 'light',
      color: '#FFD54F',
    },
  });
  const sensorList = Object.keys(sensorTypes).map((sensor) => (
    <Chart
      data={props.data}
      dataKey={sensorTypes[sensor].dataKey}
      color={sensorTypes[sensor].color}
      charType={props.charType}
    />
  ));
  return <div className="chart-container">{sensorList}</div>;
};

ChartContainer.propTypes = {
  data: PropTypes.array.isRequired,
  charType: PropTypes.string.isRequired,
};

export default ChartContainer;
