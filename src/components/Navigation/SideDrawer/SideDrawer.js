import React from 'react';
import PropTypes from 'prop-types';

import './SideDrawer.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Button from '../../UI/Button/Button';

const sideDrawer = (props) => {
  let styleClasses = ['side-drawer', 'closed'];
  if (props.show) {
    styleClasses = ['side-drawer', 'open'];
  }

  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.closeSideDrawer} />
      <nav className={styleClasses.join(' ')}>
        <NavigationItems closeSideDrawer={props.closeSideDrawer} />
        <Button
          type="button"
          styleClasses={['small']}
          name="X"
          onClick={props.closeSideDrawer}
        />
      </nav>
    </React.Fragment>
  );
};

sideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  closeSideDrawer: PropTypes.func.isRequired,
};

export default sideDrawer;
