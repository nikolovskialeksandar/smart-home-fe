import React from 'react';
import PropTypes from 'prop-types';

import './DrawerToggle.css';

const drawerToggle = (props) => (
  <div className="drawer-toggle" role="button" tabIndex={0} onClick={props.clicked}>
    <div />
    <div />
    <div />
  </div>
);

drawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default drawerToggle;
