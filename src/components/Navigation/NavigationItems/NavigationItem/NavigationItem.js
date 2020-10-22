import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const navigationItem = (props) => (
  <div
    onClick={props.closeSideDrawer}
    className={props.navbar2 ? 'navigation-item2' : 'navigation-item'}
  >
    <NavLink to={props.link}>{props.children}</NavLink>
  </div>
);

navigationItem.propTypes = {
  closeSideDrawer: PropTypes.func,
  navbar2: PropTypes.bool,
  link: PropTypes.string,
};

export default navigationItem;
