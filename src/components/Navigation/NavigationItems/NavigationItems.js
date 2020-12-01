import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  let content = null;
  let styleClasses = [];
  if (props.navbar2) {
    styleClasses = ['navigation-items2'];
    content = (
      <div className={styleClasses.join(' ')}>
        <NavigationItem link="/" navbar2>
          Today
        </NavigationItem>
        <NavigationItem link="/day" navbar2>
          Day
        </NavigationItem>
        <NavigationItem link="/month" navbar2>
          Month
        </NavigationItem>
        <NavigationItem link="/year" navbar2>
          Year
        </NavigationItem>
      </div>
    );
  } else {
    styleClasses = ['navigation-items'];
    if (props.desktopOnly) {
      styleClasses.push('desktop-only');
    }

    content = (
      <div className={styleClasses.join(' ')}>
        <NavigationItem link="/" closeSideDrawer={props.closeSideDrawer}>
          Dashboard
        </NavigationItem>
        <NavigationItem link="/logout" closeSideDrawer={props.closeSideDrawer}>
          Log out
        </NavigationItem>
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

navigationItems.propTypes = {
  closeSideDrawer: PropTypes.func,
  navbar2: PropTypes.bool,
  desktopOnly: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, null)(navigationItems);
