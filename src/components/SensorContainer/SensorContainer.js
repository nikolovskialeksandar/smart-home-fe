import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './SensorContainer.css';
import SensorChart from '../SensorChart/SensorChart';

const SensorContainer = (props) => {
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
    <SensorChart
      data={props.data}
      dataKey={sensorTypes[sensor].dataKey}
      color={sensorTypes[sensor].color}
      charType={props.charType}
    />
  ));
  return <div className="sensor-container">{sensorList}</div>;
};

SensorContainer.propTypes = {
  data: PropTypes.array.isRequired,
  charType: PropTypes.string.isRequired,
};

export default SensorContainer;
